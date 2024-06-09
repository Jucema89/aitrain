import { Component } from '@angular/core';
import { HeroHomeComponent } from "../shared/components/hero-home/hero-home.component";
import { FeaturesHomeComponent } from "../shared/components/features-home/features-home.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeroHomeComponent, FeaturesHomeComponent]
})
export class HomeComponent {

}
