import { Component } from '@angular/core';
import { HeroHomeComponent } from "../shared/components/hero-home/hero-home.component";
import { FeaturesHomeComponent } from "../shared/components/features-home/features-home.component";
import { StepsUseComponent } from "../shared/components/steps-use/steps-use.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeroHomeComponent, FeaturesHomeComponent, StepsUseComponent]
})
export class HomeComponent {

}
