import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { BadgeStatusComponent } from "../badge-status/badge-status.component";
import { CommonModule } from '@angular/common';
import { IStaticMethods } from 'preline/preline';
import { IconFilesComponent } from "../icon-files/icon-files.component";
import { NotificationService } from '../../../services/notification/notification.service';
import { LocalStorageService } from '../../../services/localStorage/localstorage.service';
import { FinetunedStatus, OpenAiFinetuned } from '../../../interfaces/openai.interfaces';
import { Router, RouterLink } from '@angular/router';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
    selector: 'app-table-train-ai',
    standalone: true,
    templateUrl: './table-train-ai.component.html',
    styleUrl: './table-train-ai.component.scss',
    imports: [CommonModule, RouterLink, BadgeStatusComponent, IconFilesComponent]
})
export class TableTrainAIComponent implements OnInit {
  
  finetunings: OpenAiFinetuned[] = []
  //idToRemove: string = ''
  lodingRow: boolean = true

  tableHeader: string[] = [
    'Nombre',
    'Modelo Base',
    'Tokens Consumidos',
    'Estado',
    'Archivos Finales',
    'Creado',
    ''
  ]

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.getTrains()
  }

  gotoOpenAIChat(modelId: string){
    window.open(`https://platform.openai.com/playground/chat?models=${modelId}`, '_blank');
  }


  async getTrains(){
    const config = (await this.localStorageService.getConfiguration()).env

    console.log('environments = ', config)

    this.apiService.getAllfinetunings(config.openAiKey).subscribe((finetunings) => {
      console.log('models finetunnnig = ', finetunings)
      this.finetunings = finetunings.data
      this.lodingRow = false
      setTimeout(() => {
        window.HSStaticMethods.autoInit();
      }, 100);
    })
  }

  getFiles(finetuned: OpenAiFinetuned): string[]{
    const files: string[] = []
    files.push(
      ...finetuned.result_files,
      finetuned.training_file,
    )
    finetuned?.validation_file ? files.push(finetuned?.validation_file) : ''
    
    return files
  }

  handlerStatus(status: FinetunedStatus): { type: string, message: string }{
    switch (status) {
      case 'running':
        return {type: 'info', message: 'En curso'}
        break;

      case 'cancelled':
        return {type: 'danger', message: 'Cancelado'}
        break;

      case 'failed':
          return { type: 'danger', message: 'Fallo'}
          break;

      case 'succeeded':
        return { type: 'success', message: 'Finalizado'}
        break;

      case 'queued':
        return { type: 'info', message: 'En Espera'}
        break;
    
      default:
        return { type: 'info', message: 'En curso'}
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

  // removeTrain(){
  //   this.apiService._deleteOneTrain(this.idToRemove).subscribe((res) => {
  //     if(res){
  //       this.notificationService.open({
  //         title: `Eliminación Exitosa`,
  //         message: `Se han eliminado los datos de entrenamiento y los archivos asociados.`,
  //         clase: 'success'
  //       })

  //       this.idToRemove = ''

  //       this.getTrains()
  //     }
  //   })
  // }

  downloadJsonl(id: string){
    this.apiService.downloadFilesJsonl(id)
  }
}
