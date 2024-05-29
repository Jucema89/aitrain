import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

/**
 * Drag And Drop Directiva
 * 
 * Directive for create effect Drag & Drop in element Specific
 */
@Directive({
  selector: '[appDnd]',
  standalone: true
})
export class DndDirective {
  @HostBinding('class.fileover') fileOver: boolean = false
  @Output() fileDropped = new EventEmitter<any>();
  @Output() dragoverStatus = new EventEmitter<boolean>();

  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    this.dragoverStatus.emit(true);
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    this.dragoverStatus.emit(false);
  }

  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
      this.dragoverStatus.emit(false);
    }
  }
}
