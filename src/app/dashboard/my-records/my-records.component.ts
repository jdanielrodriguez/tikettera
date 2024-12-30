import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Perfil, Menus } from '../../interfaces';
import { Sesion } from '../../common/sesion';

@Component({
  selector: 'app-my-records',
  templateUrl: './my-records.component.html',
  styleUrls: ['./my-records.component.scss']
})
export class MyRecordsComponent implements OnInit {
  @Output() perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  @Input() perfil: Perfil = new Perfil();
  constructor(
    private mySesion: Sesion
  ) { }
  ngOnInit(): void {
  }
  navegar(data: Menus) {
    this.mySesion.navegar(data);
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
