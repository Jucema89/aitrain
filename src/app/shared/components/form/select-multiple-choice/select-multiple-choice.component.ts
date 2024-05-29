import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

export type TypeControl = 'text' | 'textarea' | 'money' | 'select'
export type TypeInput = 'text' | 'number' | 'password' | 'email' | 'date'
export interface OptionsChecked {
  id: string
  label: string
  value: string
  checked: boolean
}

@Component({
  selector: 'app-select-multiple',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-multiple-choice.component.html'
})
export class AppSelectMultipleComponent implements OnInit {
  builder = inject(FormBuilder);

  errorClass: string = 'px-3.5 py-2 block w-full border-red-500 rounded-md text-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400';

  /**
   * Array al que hace push con los ids Seleccionados
   */
  @Input() controlArray: FormArray = this.builder.array([]);
  /**
   * Listado de Ids que estan seleccionados
   */
  @Input() idsChecked: string[] = []
  /**
   * Listado de Opciones a Mostrar en el desplegable
   */
  @Input() selectOption: OptionsChecked[] = [];
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() errorMessage: string = '';

  formArrayOptions: FormArray =  this.builder.array([])

  getValueForm(control:string, i: number): string {
    return this.formArrayOptions.controls.at(i)?.get(control)?.value
  }

  getArrayOfForm(): any[]{
    return this.formArrayOptions.getRawValue()
  }

  constructor(){}
  ngOnInit(): void {
    this.selectOption.forEach((option) => {
      this.addFormGroup( option, this.idsChecked )
    })
  }

  addFormGroup(value: OptionsChecked, idsSelected: string[]){

    const form = this.builder.group({
      id: [''],
      label: [''],
      value: [''],
      checked: [false]
    })

    if(idsSelected.includes(value.id)){
      value.checked = true
    }

    form.patchValue( value )
    this.formArrayOptions.push( form )

  }

  countCheckeds(): number {
    return this.formArrayOptions.controls.filter((control) => control.get('checked')?.value === true ).length
  }

  selectionChange(event: any){
    if(event.target.checked){
      this.setOptionToArray( event.target.value  )
    } else {
      this. removeOptionToArray( event.target.value )
    }
  }

  async setOptionToArray(idOption: string){

    const control = this.formArrayOptions.controls
    .find((control) => control.get('id')?.value === idOption);

    control?.get('checked')?.setValue(true)

    const idsChecked: string[] = await this.getIdsStringsChecked();

    idsChecked.forEach((id) => {
      if(!this.controlArray.getRawValue().includes( id )){
        const control = this.builder.control( id )
        this.controlArray.push( control)
      }
    })
  }

  async removeOptionToArray(idOption: string){

    const control = this.formArrayOptions.controls
    .find((control) => control.get('id')?.value === idOption);

    control?.get('checked')?.setValue(false)
    const idsChecked: string[] = await this.getIdsStringsChecked();
    const controlsRaw = this.controlArray.getRawValue();

    if(idsChecked.length){

      controlsRaw.forEach((id) => {

        if(!idsChecked.includes( id )){
          const index: number = controlsRaw.indexOf( id );
          this.controlArray.removeAt( index )
        }
        
      })
    } else {
      this.controlArray.removeAt( 0 )
    }

  }

  // makeControlForResponse(ids: string[]){
  //   ids.forEach((id) => {

  //   })
  // }

  getIdsStringsChecked(): Promise<string[]>{

    return new Promise((result, reject) => {
      try {
        const optionsSelected: string[] = [];

        const checkeds: any[] = this.formArrayOptions.getRawValue().filter((control: OptionsChecked) => control.checked === true );
    
        checkeds.forEach((check: OptionsChecked) => {
          optionsSelected.push( check.id )
        })
    
        result( optionsSelected )
        
      } catch (error) {
        reject(error)
      }
    })
   
  }

  isInvalid( ctrName: string ) {
    // const control = this.formGroup.get(ctrName);
    // return control?.touched && control?.errors;
  }
  

}
