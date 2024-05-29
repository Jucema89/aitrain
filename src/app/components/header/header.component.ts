import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive  } from '@angular/router';

interface RouteHeader {
  id: number
  title: string
  url: string
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router){}
  rotesUrl: RouteHeader[] = [
    {
      id: 1,
      title: 'Home',
      url: '/'
    },
    {
      id: 2,
      title: 'Trainings',
      url: '/trainings'
    },
    {
      id: 3,
      title: 'Create Training',
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
