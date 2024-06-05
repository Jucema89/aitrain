import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [],
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

}
