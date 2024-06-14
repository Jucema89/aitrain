import { Component } from '@angular/core';
import { FormTrainDocsComponent } from "../../shared/components/form-train-docs/form-train-docs.component";
import { FileUploaderComponent } from "../../shared/components/file-uploader/file-uploader.component";

@Component({
    selector: 'app-create-training-docs',
    standalone: true,
    templateUrl: './create-training-docs.component.html',
    styleUrl: './create-training-docs.component.scss',
    imports: [FormTrainDocsComponent, FileUploaderComponent]
})
export class CreateTrainingDocsComponent {

    filesToTraining: File[] = []
    clearFiles: boolean = false
    blockDropzone: boolean = false
    
    handlerFiles(files: File[]){
        this.filesToTraining = files
    }

    handleClearForm(event: boolean){
        this.clearFiles = event
    }

    handlerLockDropzone(event: boolean){
        this.blockDropzone = event
    }

}
