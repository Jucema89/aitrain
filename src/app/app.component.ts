import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event, NavigationEnd, Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IStaticMethods } from 'preline/preline';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { SnackbarComponent } from "./services/notification/snackbar/snackbar.component";
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
    imports: [CommonModule, RouterOutlet, RouterLinkActive, HeaderComponent, FooterComponent, SnackbarComponent]
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
