import { Component } from '@angular/core';
import { TableTrainDocsComponent } from "../../shared/components/table-train-docs/table-train-docs.component";

@Component({
    selector: 'app-trainings-docs',
    standalone: true,
    templateUrl: './trainings-docs.component.html',
    styleUrl: './trainings-docs.component.scss',
    imports: [TableTrainDocsComponent]
})
export class TrainingsDocsComponent {

}
