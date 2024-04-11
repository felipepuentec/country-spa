import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  @ViewChild('txtInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  @Input()
  public placeholder: string = '';

  @Output() 
  public onValue = new EventEmitter<string>();

  emitValue( inputValue: string): void{
    this.onValue.emit(inputValue);
  }

}
