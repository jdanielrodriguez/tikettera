import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente.component.html',
  styleUrls: []
})
export class ClienteComponent implements OnInit {
  today: any;
  nacimientoToday: any;
  constructor() { }

  ngOnInit(): void {
  }
  cargar(form: any) {
  }

}
