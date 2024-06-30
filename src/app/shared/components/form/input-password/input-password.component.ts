import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,  SvgIconComponent ],
  providers: [ ],
  templateUrl: './input-password.component.html'
})
export class InputPasswordComponent implements OnInit, OnDestroy {
  builder = inject(FormBuilder);
  @Input() formGroup: FormGroup = this.builder.group({})
  @Input() control: string = ''
  @Input() controlRepeat: string = ''
  @Input() checkShow: boolean = false
  @Input() readonly: boolean = false
  @Input() tooltip: string = ''
  @Input() internLabel: string = ''
  @Output() keydownEnter: EventEmitter<boolean> = new EventEmitter()

  repeatValid: boolean = false
  repeatValid$!: Subscription
  passValid$!: Subscription
  showPass: boolean = false
  messageErrorRepeat = 'Passwords are not the same'

  normalClass: string = "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:pointer-events-none"

  errorClass: string = "px-3.5 py-2 block w-full border-red-500 rounded-md text-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"

  iconClass: string = "w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-transparent text-gray-700 disabled:opacity-50 disabled:pointer-events-none"

  errorIconClass: string = "w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-transparent text-red-400 fill-red-500 disabled:opacity-50 disabled:pointer-events-none"

  normalLabel: string = "block text-sm text-gray-900 font-medium mb-2 dark:text-white  hs-tooltip [--placement:right] flex inline-flex gap-2"

  disabledLabel: string = "block text-sm font-medium mb-2 text-gray-300 dark:text-white"


  internalLabelClass = "px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400"

  errorInternalLabelClass = "px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-red-200 bg-red-50 text-sm text-red-500 dark:bg-neutral-700 dark:border-red-700 dark:text-red-400"

  get f() {
    return this.formGroup.controls
  }

  get pass() {
    return this.formGroup.get(this.control)
  }

  // validatePassEquals(){
  //   return this.formGroup.get(this.controlRepeat)?.value === this.formGroup.get(this.control)?.value
  // }

  ngOnInit() {
    //pass
    this.passValid$ = (this.formGroup.get(this.control) as FormControl).valueChanges.subscribe((pass) => {
      if(pass === this.formGroup.get(this.controlRepeat)?.value){
        this.repeatValid = true
      } else {
        this.repeatValid = false
      }
    })
    //repeat pass
    this.repeatValid$ = (this.formGroup.get(this.controlRepeat) as FormControl).valueChanges.subscribe((repeat) => {
      if(repeat === this.formGroup.get(this.control)?.value){
        this.repeatValid = true
      } else {
        this.repeatValid = false
      }
    })
  }

  ngOnDestroy(): void {
    this.passValid$.unsubscribe()
    this.repeatValid$.unsubscribe()
  }

  setClassStyle(control: string): string {
    if (this.isInvalid(control)) {
      return this.errorClass
    }
    return this.normalClass
  }

  isInvalid(ctrName: string): boolean {
    const control = this.formGroup.get(ctrName)
    if(control){
      return control.touched && (control.errors ? true : false)
    }else {
      return true
    }
  }

}
