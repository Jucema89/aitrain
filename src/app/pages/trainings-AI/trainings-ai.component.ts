import { Component } from '@angular/core';
import { TableTrainAIComponent } from "../../shared/components/table-train-ai/table-train-ai.component";

@Component({
    selector: 'app-trainings-ai',
    standalone: true,
    templateUrl: './trainings-ai.component.html',
    styleUrl: './trainings-ai.component.scss',
    imports: [ TableTrainAIComponent]
})
export class TrainingsAIComponent {

}
