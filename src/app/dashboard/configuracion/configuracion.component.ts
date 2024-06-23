import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Perfil, Menus } from 'src/app/interfaces';
import { Sesion } from 'src/app/common/sesion';
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
    private route: ActivatedRoute,
    private mySesion: Sesion
  ) { }
  ngOnInit(): void {
    this.getParams();
  }
  getParams() {
    const paramType = this.route.firstChild?.snapshot.paramMap.get('tipo');
    this._type = paramType ?? 'profile';
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
    const tabMap: { [key: string]: number } = {
        'profile': 1,
        'sliders': 2,
        'direcciones': 3,
        'metodos-pago': 4,
        'encabezado': 5,
        'correos': 6,
        'password': 7,
        'cuentas': 8
    };

    return tabMap[this._type] ?? 1;
  }
}
