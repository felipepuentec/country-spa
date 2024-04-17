import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy { // el OnDestroy es otra parte del ciclo de vida cque se llama cuando el componente va a ser destruido

  // Subject es un tipo especial de observable, es como crear un observable manualmente
  private debouncer = new Subject<string>(); 
  private debouncerSuscription?: Subscription;

  @Input()
  public initialValue: string = "";

  @Input()
  public placeholder: string = '';

  @Output() 
  public onValue = new EventEmitter<string>();

  @Output() 
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    // Cuando el observable deja de emitir valores por 1 segundo, le manda el valor al subscribe
    this.debouncerSuscription =
    this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue( inputValue: string): void{
    this.onValue.emit(inputValue);
  }

  onKeyPress( searchTerm: string ){
    // Debouncer: forma de esperar a que el usuario deje de escribir para realizar la peticion
    this.debouncer.next(searchTerm);

  }

}
