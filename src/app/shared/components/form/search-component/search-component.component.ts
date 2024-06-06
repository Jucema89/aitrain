import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [ ReactiveFormsModule, NgClass ],
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.scss'
})
export class SearchComponentComponent {

  builder = inject(FormBuilder);

  @Input() formGroup: FormGroup = this.builder.group({});
  @Input() control: string = '';
  @Input() search: boolean = false
  @Input() check: boolean = false
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';
  @Output() clickSearch: EventEmitter<boolean> = new EventEmitter()

  clickEvent(){
    this.search = true
    this.clickSearch.emit(true)
  }

  buttonClassNormal = `w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none`

  buttonClassCheck = `w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none`

}
