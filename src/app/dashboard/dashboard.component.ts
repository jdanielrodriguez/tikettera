import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Perfil, Menus } from '../interfaces';
import { Sesion } from '../common/sesion';
import { Constantes } from '../common/constant';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  perfil: Perfil = new Perfil();
  perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  @Input() type!: string;
  active: number = 1;
  constructor(
    private route: ActivatedRoute,
    private mySesion: Sesion,
        private constantes: Constantes
  ) { }
  ngOnInit(): void {
    this.mySesion.actualizaPerfil();
    this.perfil = this.mySesion.perfil;
    this.getParams();
  }
  getParams() {
    this.route.paramMap.subscribe(params => {
      const paramType = params.get('tipo');
      this.type = paramType ?? this.type;
      if (this.type === 'settings') {
        this.mySesion.navegar({ url: '../dashboard/settings/profile' });
      }
      this.active = this.setActive();
    });
  }
  navegar(data: Menus) {
    this.mySesion.navegar(data);
  }
  obtenerPerfilConf(value: Perfil) {
    this.perfil = value;
    this.perfilEmit.emit(this.perfil);
  }

  setActive(): number {
    const tabMap: { [key: string]: number } = {
      'information': 1,
      'produced-events': 2,
      'entries': 3,
      'payment-methods': 4,
      'bills': 5,
      'settings': 6,
      'autorizar-promotores': 7
    };
    if (this.type?.startsWith('produced-events')) {
      return tabMap['produced-events'];
    }
    if (this.type?.startsWith('payment-methods')) {
      return tabMap['payment-methods'];
    }
    if (this.type?.startsWith('bills')) {
      return tabMap['bills'];
    }
    return this.type ? (tabMap[this.type] ?? tabMap['information']) : tabMap['settings'];
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
