import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Perfil } from 'src/app/interfaces';
import { Sesion } from '../../common/sesion';

@Component({
  selector: 'app-my-information',
  templateUrl: './my-information.component.html',
  styleUrls: ['./my-information.component.scss']
})
export class MyInformationComponent implements OnInit {
  @Input() perfil: Perfil = new Perfil();
  categorias: number = 20;
  productos: number = 245;
  ordenes: number = 43;
  perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  constructor(private mySesion: Sesion) { }

  ngOnInit(): void {
    this.mySesion.actualizaPerfil();
  }
  obtenerPerfilConf(value: Perfil) {
    this.perfil = value;
    this.perfilEmit.emit(this.perfil);
  }
  @Output()
  get obtenerPerfil(): EventEmitter<Perfil> {
    this.perfilEmit.emit(this.perfil);
    return this.perfilEmit;
  }
}
