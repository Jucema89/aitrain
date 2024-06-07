import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './card-file-upload.component.html',
  styleUrl: './card-file-upload.component.scss'
})
export class CardFileUploadComponent {
  @Input() files: File[] = []
  @Output() removeAllFiles: EventEmitter<string> = new EventEmitter()


  /**
 * Transform bytes to Kb or Mb
 * @param size - size file in bytes. 
 * @returns Strind with data in KB o MB.
 */
  formatFileSize(size: number): string {
    const kb = size / 1024;
    const mb = kb / 1024;

    if (mb >= 1) {
      return `${mb.toFixed(2)} MB`;
    } else {
      return `${kb.toFixed(2)} KB`;
    }
  }

  removeFile(index: number){
    this.files.splice(index, 1)
  }

}
