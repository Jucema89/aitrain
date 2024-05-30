import { Component } from '@angular/core';
import { TableTrainComponent } from "../shared/components/table-train/table-train.component";

@Component({
    selector: 'app-trainings',
    standalone: true,
    templateUrl: './trainings.component.html',
    styleUrl: './trainings.component.scss',
    imports: [TableTrainComponent]
})
export class TrainingsComponent {

}
