import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Cliente } from './../../interfaces';
@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente.component.html',
  styleUrls: []
})
export class ClienteComponent implements OnInit {
  today: any;
  nacimientoToday: any;
  private _cliente: EventEmitter<Cliente> = new EventEmitter<Cliente>();
  private _data: Cliente = new Cliente();
  constructor() { }

  ngOnInit(): void {
  }
  cargar(form: any) {
    this.data = form.value;
    this._cliente.emit(this.data);
  }
  @Output()
  get form(): EventEmitter<Cliente> {
    this._cliente.emit(this.data);
    return this._cliente;
  }
  @Input()
  set data(value: Cliente) {
    if (!value) {
      value = new Cliente();
    }
    this._data = value;
  }
  get data(): Cliente {
    return this._data;
  }

}
