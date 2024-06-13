import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive  } from '@angular/router';
import { LogoAitrainComponent } from "../logo-aitrain/logo-aitrain.component";

interface RouteHeader {
  id: number
  title: string
  url: string
  subroutes: RouteHeader[]
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
      url: '/',
      subroutes: []
    },
    {
      id: 2,
      title: 'IA Training',
      url: '',
      subroutes: [
        {
          id: 2.1,
          title: 'Crear Entrenamiento',
          url: '/training/create',
          subroutes: []
        },
        {
          id: 2.2,
          title: 'Tabla Entrenamientos',
          url: '/training/list',
          subroutes: []
        },
      ]
    },
    {
      id: 3,
      title: 'Docs Trainers',
      url: '',
      subroutes: [
        {
          id: 3.1,
          title: 'Crear Docs',
          url: '/docs/create',
          subroutes: []
        },
        {
          id: 3.2,
          title: 'Tabla Docs',
          url: '/docs/list',
          subroutes: []
        },
      ]
    },
    {
      id: 4,
      title: 'Configuration',
      url: '/configuration',
      subroutes: []
    }
  ]

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

}
