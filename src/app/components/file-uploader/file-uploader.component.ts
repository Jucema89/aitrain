import { Component, ViewChild, viewChild } from '@angular/core';
import { DndDirective } from '../../directives/dragAndDrop.directive';
import { CardFileUploadComponent } from "../card-file-upload/card-file-upload.component";

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
export class FileUploaderComponent {
  //@ViewChild('one-file-upload') inputUploaded?: HTMLInputElement 
  
  files: File[] = [];

  onFileDropped(files: FileList) {
    console.log('Archivos arrastrados:', files);
    this.files.push(files[0])
    // Maneja los archivos arrastrados
  }

  onDragOverStatus(isDragging: boolean) {
    console.log('Estado de arrastre:', isDragging);
    // Maneja el estado de arrastre
  }

  buttonUpload(){
    const input = document.getElementById('one-file-upload')  as HTMLInputElement
    if(input) input.click()
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.files.push(input.files[0])
    }
  }

  handlerRemove(event: string){
    if(event === 'remove') this.files = []
  }

  

}
