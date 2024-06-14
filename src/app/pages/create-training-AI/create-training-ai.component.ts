import { Component } from '@angular/core';
import { FormTrainDocsComponent } from "../../shared/components/form-train-docs/form-train-docs.component";
import { FileUploaderComponent } from "../../shared/components/file-uploader/file-uploader.component";
import { FormTrainAIComponent } from "../../shared/components/form-train-ai/form-train-ai.component";

@Component({
    selector: 'app-create-training-ai',
    standalone: true,
    templateUrl: './create-training-ai.component.html',
    styleUrl: './create-training-ai.component.scss',
    imports: [FileUploaderComponent, FormTrainAIComponent]
})
export class CreateTrainingAIComponent {

    filesToTraining: File[] = []
    clearFiles: boolean = false
    
    handlerFiles(files: File[]){
        this.filesToTraining = files
    }

    handleClearForm(event: boolean){
        this.clearFiles = event
    }

}
