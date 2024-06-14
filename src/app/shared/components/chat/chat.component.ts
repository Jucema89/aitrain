import { AfterViewInit, Component, ElementRef, model, OnInit, ViewChild } from '@angular/core';
import { IStaticMethods } from 'preline';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements AfterViewInit {
  @ViewChild('new_chat') buttonModal!: ElementRef<HTMLButtonElement>

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.buttonModal.nativeElement.click();
    }, 100); 
  }
}
