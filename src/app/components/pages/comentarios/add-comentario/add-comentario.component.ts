import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Comentario, Perfil } from '../../../../interfaces';

@Component({
  selector: 'app-comentarios-form',
  templateUrl: './add-comentario.component.html',
  styleUrls: []
})
export class AddComentarioComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  private _comentar: EventEmitter<Comentario> = new EventEmitter<Comentario>();
  private _perfilActual!: Perfil;
  private _mensaje!: Comentario;
  constructor(
  ) { }
  ngOnInit(): void {
  }
  crear(value: string, form?: any) {
    this._mensaje = new Comentario();
    this._mensaje.comentario = value;
    this._mensaje.usuario = this.perfil.id;
    this._comentar.emit(this._mensaje);
    if (form) {
      form.reset();
    }
  }
  @Input() set perfil(value: Perfil) {
    this._perfilActual = value;
  }
  get perfil(): Perfil {
    return this._perfilActual;
  }
  @Output()
  get comentar(): EventEmitter<Comentario> {
    this._comentar.emit(this._mensaje);
    return this._comentar;
  }
  get mensaje(): Comentario {
    return this._mensaje;
  }
}
