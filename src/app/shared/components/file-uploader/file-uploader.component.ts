import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, viewChild } from '@angular/core';
import { DndDirective } from '../../../directives/dragAndDrop.directive';
import { CardFileUploadComponent } from "../card-file-upload/card-file-upload.component";
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
    selector: 'app-file-uploader',
    standalone: true,
    templateUrl: './file-uploader.component.html',
    styleUrl: './file-uploader.component.scss',
    imports: [
        DndDirective,
        CardFileUploadComponent
    ]
})
export class FileUploaderComponent implements OnChanges {
  @Output() fileAdded: EventEmitter<File[]> = new EventEmitter()
  @Input() clearFiles: boolean = false
  @Input() blockComponent: boolean = false

  constructor(
    private notificationService: NotificationService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.clearFiles){
      this.files = []
    }
  }
  
  files: File[] = []
  extensionValid: string[] = [
    'txt', 'docx', 'doc', 'pdf', 'PDF', 'xls', 'xlsx', 'ppt', 'pptx'
  ]


  onFileDropped(files: FileList) {
    const arrayFiles = Array.from(files)
    const arrayFilesError: File[] = []
    
    arrayFiles.forEach((file) => {
      if(this.iSvalidTypeFile(file.name)){
        this.files.push(file)
      } else {
        arrayFilesError.push(file)
      }
    })
   
    this.fileAdded.emit( this.files )

    if(arrayFilesError.length){
      this.generatePopUpErrorFiles(arrayFilesError)
    }
  }

  onDragOverStatus(isDragging: boolean) {
    // Maneja el estado de arrastre
  }

  buttonUpload(){
    const input = document.getElementById('one-file-upload')  as HTMLInputElement
    if(input) input.click()
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if(this.iSvalidTypeFile(input.files[0].name)){
        this.files.push(input.files[0])
        this.fileAdded.emit( this.files )
      } else {
        this.generatePopUpErrorFiles([ input.files[0] ])
      }
    }
  }

  handlerRemove(event: string){
    if(event === 'remove') this.files = []
    this.fileAdded.emit( this.files )
  }

  iSvalidTypeFile(fileName: string): boolean {
    const nameArray: string[] = fileName.split('.');
    const ext: string = nameArray[ nameArray.length - 1 ];

    if(this.extensionValid.includes(ext)){
      return true
    } else {
      return false
    }
  }

  generatePopUpErrorFiles(files: File[]){
    if(files.length){
      if(files.length > 1){
        let stringError: string[] = []
        files.forEach((file) => {
            stringError.push(
                `<li class="flex space-x-3">
                <span class="size-5 flex justify-center items-center rounded-full bg-yellow-600 text-yellow-100">
    
                <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"  width="24" height="24" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
    
              </span>
              <span class="text-gray-600 dark:text-white">
              ${file.name}
              </span>
              </li>`
            )
        })
    
        this.notificationService.open({
          title: `Error in file types`,
          messageHtml:  `
          <p class="text-sm text-gray-500 dark:text-neutral-500">The following files have illegal extensions</p>
          <ul class="space-y-3 text-sm">${stringError.join('')}</ul>
          `,
          messageUseHtml: true,
          message: '',
          clase: 'alert'
        })
      } else {
        this.notificationService.open({
          title: 'Error en Archivo',
          message: `El archivo: ${files[0].name} poseé una extension no valida.`,
          clase: 'alert'
        })
      }
    }
  }

  

}
