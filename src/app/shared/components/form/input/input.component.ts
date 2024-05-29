import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent, SvgIconRegistryService } from 'angular-svg-icon';
import { OptionsSelect, TypeControl, TypeInput } from '../form.interface';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,  SvgIconComponent ],
  providers: [ ],
  templateUrl: './input.component.html'
})
export class InputComponent {

  errorClass: string = 'px-3.5 py-2 block w-full border-red-500 rounded-md text-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400';

  normalClass: string = 'block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'

  iconClass: string = "py-3 px-4 pl-11 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"

  errorIconClass: string = "py-3 px-4 pl-11 block w-full border-red-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-red-500 focus:ring-red-500 dark:bg-red-900 dark:border-red-700 dark:text-gray-400"

  normalLabel: string = "block text-sm text-gray-900 font-medium mb-2 dark:text-white"
  disabledLabel: string = "block text-sm font-medium mb-2 text-gray-300 dark:text-white"

  builder = inject(FormBuilder);

  @Input() formGroup: FormGroup = this.builder.group({});
  @Input() control: string = '';
  @Input() icon: string = '';
  @Input() type: TypeControl = 'text';
  @Input() inputType: TypeInput = 'text';
  @Input() selectOption: OptionsSelect[] = [];
  @Input() textareaRow: number = 3;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';
  @Input() checkShow: boolean = false;
  @Input() readonly: boolean = false;
  @Output() keydownEnter: EventEmitter<boolean> = new EventEmitter();


  setClassStyle(control: string): string {

    if (this.isInvalid(control)) {

      if (this.icon) {
        return this.errorIconClass
      }

      return this.errorClass
    }

    if (!this.isInvalid(control) && this.icon) {
      return this.iconClass
    }

    return this.normalClass

  }

  isInvalid(ctrName: string) {
    const control = this.formGroup.get(ctrName);
    return control?.touched && control?.errors;
  }


}
