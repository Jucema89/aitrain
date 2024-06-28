import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HeaderComponent } from '../components/header/header.component';
import { LogoAitrainComponent } from "../components/logo-aitrain/logo-aitrain.component";

@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    imports: [CommonModule, SidebarComponent, RouterModule, HeaderComponent, LogoAitrainComponent ]
})
export class LayoutComponent implements OnInit {
    isMobile: boolean = false

    private breakpointObserver = inject(BreakpointObserver);

    ngOnInit(): void {
        this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
      });
    }
 
}
