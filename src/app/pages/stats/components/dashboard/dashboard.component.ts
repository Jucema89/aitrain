import { Component } from '@angular/core';
import { CardsStatsComponent } from "../cards-stats/cards-stats.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [CardsStatsComponent]
})
export class DashboardComponent {

}
