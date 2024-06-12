import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive  } from '@angular/router';
import { LogoAitrainComponent } from "../logo-aitrain/logo-aitrain.component";

interface RouteHeader {
  id: number
  title: string
  url: string
}
@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [
        RouterLinkActive,
        RouterLink,
        NgClass,
        LogoAitrainComponent
    ]
})
export class HeaderComponent {
  constructor(private router: Router){}
  rotesUrl: RouteHeader[] = [
    {
      id: 1,
      title: 'Inicio',
      url: '/'
    },
    {
      id: 2,
      title: 'Lista de Docs',
      url: '/trainings'
    },
    {
      id: 3,
      title: 'Crear Docs',
      url: '/create'
    },
    {
      id: 4,
      title: 'Configuration',
      url: '/configuration'
    }
  ]

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

}
