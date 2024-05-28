import { Component } from '@angular/core';
import { DndDirective } from '../../directives/dragAndDrop.directive';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [
    DndDirective
  ],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss'
})
export class FileUploaderComponent {

  onFileDropped(files: FileList) {
    console.log('Archivos arrastrados:', files);
    // Maneja los archivos arrastrados
  }

  onDragOverStatus(isDragging: boolean) {
    console.log('Estado de arrastre:', isDragging);
    // Maneja el estado de arrastre
  }
  

}
