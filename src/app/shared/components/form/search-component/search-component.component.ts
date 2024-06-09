import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {NgClass} from '@angular/common';

export interface SearchComponentClick { click: boolean, control: string }
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
  @Output() clickSearch: EventEmitter<SearchComponentClick> = new EventEmitter()

  clickEvent(){
    this.search = true
    this.clickSearch.emit({ click: true, control: this.control })
  }

  buttonClassNormal = `w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none`

  buttonClassCheck = `w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none`

  inputNormalClass = "py-3 px-4 block w-full border-2 border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"

  inputErrorClass = "py-3 px-4 block w-full border-2 border-red-500 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-red-200 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-red-900 dark:border-red-700 dark:text-red-400 dark:placeholder-neutral-500 dark:focus:ring-red-600"


  isInvalid(ctrName: string): boolean {
    const control = this.formGroup.get(ctrName)
    if(control){
      return control.touched && (control.errors ? true : false)
    }else {
      return true
    }
    
  }

}
