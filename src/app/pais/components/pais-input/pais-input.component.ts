import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  @Input() placeholder: string = '';

  ngOnInit() {
    this.deBouncer
    .pipe(debounceTime(300))
    .subscribe(valor => this.onDebounce.emit(valor));
  }

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  deBouncer: Subject<string> = new Subject();

  termino: string = '';

  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada() {
    this.deBouncer.next(this.termino);
  }

}
