import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { Observable, of } from 'rxjs';
import { FileTraining, StatusFileTrain, Training } from '../../../interfaces/training.interface';
import { BadgeStatusComponent } from "../badge-status/badge-status.component";
import { CommonModule } from '@angular/common';
import { IconFilesComponent } from "../icon-files/icon-files.component";
import { NotificationService } from '../../../services/notification/notification.service';
import { LocalStorageService } from '../../../services/localStorage/localstorage.service';

@Component({
    selector: 'app-table-train-docs',
    standalone: true,
    templateUrl: './table-train-docs.component.html',
    styleUrl: './table-train-docs.component.scss',
    imports: [CommonModule, BadgeStatusComponent, IconFilesComponent]
})
export class TableTrainDocsComponent implements OnInit {

  trainings$: Observable<Training[]> = this.apiService.getTrainings()
  trainings: Training[] = []
  idToRemove: string = ''
  messageNeedConfig: boolean = true

  tableHeader: string[] = [
    'Nombre',
    'Modelo Genrador',
    'Tokens Usados',
    'Estado',
    'Archivos Base',
    'Creado',
    ''
  ]

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService
  ){}
  
  ngOnInit(): void {
    this.getTrains()
  }

  getTrains(){
    this.localStorageService.getConfiguration().then((env) => {
      if(env.success){
        this.messageNeedConfig = false
        this.trainings$.subscribe((trains) => {
          this.trainings = trains 
        })
      } else {
        this.messageNeedConfig = true
      }
    })
  }

  getFiles(files: FileTraining[] | File[]): FileTraining[]{
    const ableFiles = files as FileTraining[]
    return ableFiles.filter((file) => file.typeFileInTrain === 'base')
  }

  handlerStatus(status: StatusFileTrain): { type: string, message: string }{
    switch (status) {
      case 'start':
        return {type: 'info', message: 'En curso'}
        break;

      case 'cancel':
        return {type: 'danger', message: 'Cancelado'}
        break;

      case 'cancel_with_error':
          return { type: 'danger', message: 'Con error'}
          break;

      case 'finish':
        return { type: 'success', message: 'Creado'}
        break;
    
      default:
        return { type: 'normal', message: 'Indefinido'}
        break;
    }
  }

  handleTypeFile(ext: string): string{
    if(ext === 'txt' || ext === 'docx' || ext === 'doc'){
      return 'word'
    }

    if(ext === 'pdf' || ext === 'PDF'){
      return 'pdf'
    }

    if(ext === 'xls' || ext === 'xlsx'){
      return 'excel'
    }

    if(ext === 'png' || ext === 'jpg' || ext === 'jpeg'){
      return 'image'
    }

    if(ext === 'ppt' || ext === 'pptx'){
      return 'presentation'
    }

    if(ext === 'zip' || ext === 'rar'){
      return 'zip'
    }

    else return ''
  }

  removeTrain(){
    this.apiService._deleteOneTrain(this.idToRemove).subscribe((res) => {
      if(res){
        this.notificationService.open({
          title: `Eliminación Exitosa`,
          message: `Se han eliminado los datos de entrenamiento y los archivos asociados.`,
          clase: 'success'
        })
        this.idToRemove = ''
        this.getTrains()
      }
    })
  }

  downloadJsonl(id: string){
    this.apiService.downloadFilesJsonl(id)
  }
}
