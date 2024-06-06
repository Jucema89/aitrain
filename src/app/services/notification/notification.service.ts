import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { SnackbarType } from './snackbar/snackbar.component';

export interface NotificationData {
  title: string
  time?: string | Date
  clase: SnackbarType
  message: string
  messageHtml?: string
  messageUseHtml?: boolean

}
@Injectable({
  providedIn: 'root'
})

/**
 * Notificaction Service
 * 
 * Genera snackbars o popups en respuesta a ciertas acciones de procesos: 
 * - Exitosos: 'sucess'
 * - Informativos: 'info'
 * - Destructivos: 'danger,
 * - Alerta: 'alert'
 * 
 * Usa el componente Standalone de SnackBar Component para renderizar dinamicamente cada estado  de alerta
 */
export class NotificationService {

  /**
   * Subject que crea el flujo Observable que contiene la notificacion a ser renderiaza
   */
  private showNotifySub$ : Subject<NotificationData> = new Subject()
  /**
   * Observable creado a partir de showNotifySub; el Subject. Sirve para suscribirse al Observable que dispara y trasmite la notificacion
   */
  public showNotify$: Observable<NotificationData> = this.showNotifySub$.asObservable()

  constructor(){}

  /**
   * Usa el subject de showNotifySub$ para iniciar la emision de la notificacion al observable que a su vez renderizara el componente de snackbar en la vista del usuario
   * @param notification {Notify} 
   */
  open( notification: NotificationData ) {
    this.showNotifySub$.next(notification)
  }

}
