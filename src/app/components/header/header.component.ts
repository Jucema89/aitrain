import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
      url: '/env'
    }
  ]

}
