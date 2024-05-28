import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event, NavigationEnd, Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IStaticMethods } from 'preline/preline';
import { HeaderComponent } from "./components/header/header.component";
import { TableTrainComponent } from './components/table-train/table-train.component';
import { FooterComponent } from "./components/footer/footer.component";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, RouterLinkActive, HeaderComponent, TableTrainComponent, FooterComponent]
})
export class AppComponent {
  title = 'aitrain-front'

  constructor(
    private router: Router
  ){}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }

}
