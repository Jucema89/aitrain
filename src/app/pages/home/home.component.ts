import { Component } from '@angular/core';
import { HeroHomeComponent } from "../../shared/components/hero-home/hero-home.component";
import { FeaturesHomeComponent } from "../../shared/components/features-home/features-home.component";
import { StepsUseComponent } from "../../shared/components/steps-use/steps-use.component";
import { StackTechComponent } from "../../shared/components/stack-tech/stack-tech.component";
import { NextFeatureComponent } from "../../shared/components/next-feature/next-feature.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeroHomeComponent, FeaturesHomeComponent, StepsUseComponent, StackTechComponent, NextFeatureComponent, FooterComponent]
})
export class HomeComponent {

}
