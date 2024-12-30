import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Perfil, Menus } from '../../interfaces';
import { Sesion } from '../../common/sesion';
import { Constantes } from '../../common/constant';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  @Output() perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  @Input() perfil: Perfil = new Perfil();
  @Input() type!: string;
  constructor(
    private route: ActivatedRoute,
    private mySesion: Sesion,
    private constantes: Constantes
  ) { }
  ngOnInit(): void {
    this.getParams();
  }
  getParams() {
    const paramType = this.route.firstChild?.snapshot.paramMap.get('tipo');
    this.type = paramType ?? 'profile';
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

  get active(): number {
    const tabMap: { [key: string]: number } = {
      'profile': 1,
      'advertisements': 2,
      'credit-cards': 3,
      'encabezado': 4,
      'correos': 5,
      'password': 6,
      'cuentas': 7
    };

    return tabMap[this.type] ?? 1;
  }

  get rolAdmin(): number {
    return this.constantes.roles.admin;
  }

  get rolProducer(): number {
    return this.constantes.roles.promoter;
  }

  get rol(): number {
    let ret = 0;
    this.mySesion.actualizaPerfil();
    const perfil: Perfil = this.mySesion.perfil ? this.mySesion.perfil : (new Perfil());
    if (perfil.rol_id) {
      ret = perfil.rol_id ? perfil.rol_id : 0;
    }
    return ret;
  }
}
