import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, map } from 'rxjs';
import { NotificationData, NotificationService } from '../notification.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HtmlParser } from '@angular/compiler';

export type SnackbarType = 'success' | 'alert' | 'error' | 'info';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {
 // @ViewChild('snackBar') snackBar!: ElementRef<HTMLElement>;

  snackbarSubs$: Subscription | undefined;

  title: string = ''
  time: string | Date = 'Just Now'
  message: string = ''
  messageUseHtml: boolean = false
  clase: SnackbarType = 'success'
  messageHtml: SafeHtml = ''


  constructor(
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {

    this.snackbarSubs$ = this.notificationService.showNotify$.pipe(
      map((notiData: NotificationData) => {
        this.messageUseHtml = notiData.messageUseHtml || false;
        this.messageHtml =  this.sanitizer.bypassSecurityTrustHtml(notiData.messageHtml || '');
        this.title = notiData.title;
        this.message = notiData.message;
        this.clase = notiData.clase;
        this.time = notiData.time ? notiData.time : '';
        //return true
    })).subscribe((response) => {
      this.openSnackbar()
    });
  }

  ngOnDestroy(): void {
    this.snackbarSubs$?.unsubscribe()
  }

  openSnackbar () {
    let snackBar: HTMLElement = document.getElementById('snackbar') as HTMLElement
    snackBar.className = "show";

    setTimeout(() => { 
      snackBar.className = snackBar.className.replace('show', '')
    }, 5000 );
  }

}
