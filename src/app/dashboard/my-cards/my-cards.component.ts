import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Perfil, Menus } from 'src/app/interfaces';
import { Sesion } from 'src/app/common/sesion';

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.scss']
})
export class MyCardsComponent implements OnInit {
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
