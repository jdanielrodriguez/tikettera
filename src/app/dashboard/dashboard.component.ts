import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Perfil, Menus } from 'src/app/interfaces';
import { Sesion } from 'src/app/common/sesion';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  perfil: Perfil = new Perfil();
  perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  @Input() type!: string;
  constructor(
    private route: ActivatedRoute,
    private mySesion: Sesion
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
    });
  }
  navegar(data: Menus) {
    this.mySesion.navegar(data);
  }
  obtenerPerfilConf(value: Perfil) {
    this.perfil = value;
    this.perfilEmit.emit(this.perfil);
  }

  get active(): number {
    const tabMap: { [key: string]: number } = {
      'information': 1,
      'produced-events': 2,
      'entries': 3,
      'credit-cards': 4,
      'bills': 5,
      'settings': 6,
      'autorizar-promotores': 7
    };

    return this.type ? (tabMap[this.type] ?? tabMap['information']) : tabMap['settings'];
  }

  get rolAdmin(): number {
    return 1;
  }

  get rolProducer(): number {
    return 2;
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
