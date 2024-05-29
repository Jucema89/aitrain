import { Component } from '@angular/core';
import { FormTrainComponent } from "../components/form-train/form-train.component";
import { FileUploaderComponent } from "../components/file-uploader/file-uploader.component";

@Component({
    selector: 'app-create-training',
    standalone: true,
    templateUrl: './create-training.component.html',
    styleUrl: './create-training.component.scss',
    imports: [FormTrainComponent, FileUploaderComponent]
})
export class CreateTrainingComponent {

}
