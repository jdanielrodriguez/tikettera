import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sesion } from '../../../common/sesion';
import { Perfil, Comentario } from '../../../interfaces';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: []
})
export class SendComponent implements OnInit {
  private _perfilActual!: Perfil;
  private _conversacion: Comentario[] = [
    {
      comentario: 'Negro HDP',
      usuario: 2,
      comment: 3,
      recive: true,
      id: 1
    },
    {
      comentario: 'Maldito Maricon',
      usuario: 1,
      comment: 1,
      recive: false,
      id: 2
    }
  ];
  private _cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private mySesion: Sesion
  ) { }
  ngOnInit(): void {
  }
  cerrarChat() {
    this._cerrar.emit(true);
  }
  get conversacionActual(): Perfil {
    return this._perfilActual;
  }
  @Input()
  set conversacionActual(value: Perfil) {
    this._perfilActual = value;
  }
  @Output()
  get cerrar(): EventEmitter<boolean> {
    this._cerrar.emit(false);
    return this._cerrar;
  }
  set cerrar(value: EventEmitter<boolean>) {
    this._cerrar = value;
  }
  get conversacion(): Comentario[] {
    return this._conversacion;
  }
  set conversacion(value: Comentario[]) {
    this._conversacion = value;
  }
}
