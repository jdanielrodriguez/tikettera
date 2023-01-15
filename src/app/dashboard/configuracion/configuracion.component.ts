import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Perfil, Menus } from 'src/app/interfaces';
import { Sesion } from 'src/app/metodos';
@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  private _perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  private _perfil: Perfil = new Perfil();
  private _type!: string;
  constructor(
    private mySesion: Sesion
  ) { }
  ngOnInit(): void {
  }
  navegar(data: Menus) {
    this.mySesion.navegar(data);
  }
  obtenerPerfilConf(value: Perfil) {
    this._perfil = value;
    this._perfilEmit.emit(this._perfil);
  }
  @Output()
  get obtenerPerfil(): EventEmitter<Perfil> {
    this._perfilEmit.emit(this._perfil);
    return this._perfilEmit;
  }
  @Input()
  set perfil(value: Perfil) {
    this._perfil = value;
  }
  get perfil(): Perfil {
    return this._perfil;
  }
  @Input()
  set type(value: string) {
    this._type = value;
  }
  get type(): string {
    return this._type;
  }

  get active(): number {
    switch (this._type) {
      case 'perfil': {
        return 1;
      }
      case 'sliders': {
        return 2;
      }
      case 'direcciones': {
        return 3;
      }
      case 'metodos-pago': {
        return 4;
      }
      case 'encabezado': {
        return 5;
      }
      case 'correos': {
        return 6;
      }
      case 'password': {
        return 7;
      }
      case 'cuentas': {
        return 8;
      }
      default: {
        return 1;
      }
    }
  }
}
