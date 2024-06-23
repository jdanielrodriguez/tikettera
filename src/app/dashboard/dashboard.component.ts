import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Perfil, Menus } from 'src/app/interfaces';
import { Sesion } from 'src/app/common/sesion';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  private _perfil: Perfil = new Perfil();
  private _type!: string;
  private _perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  constructor(
    private route: ActivatedRoute,
    private mySesion: Sesion
  ) { }
  ngOnInit(): void {
    this.mySesion.actualizaPerfil();
    this.getParams();
  }
  getParams() {
    this.route.paramMap.subscribe(params => {
      const paramType = params.get('tipo');
      this._type = paramType ?? this._type;

      if (this._type === 'settings') {
        this.mySesion.navegar({url: '../dashboard/settings/profile'});
      }
    });
  }
  navegar(data: Menus) {
    this.mySesion.navegar(data);
  }
  obtenerPerfilConf(value: Perfil) {
    this._perfil = value;
    this._perfilEmit.emit(this._perfil);
  }
  get perfil(): Perfil {
    return this.mySesion.perfil;
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
        'events': 1,
        'information': 2,
        'credit-cards': 3,
        'orders': 4,
        'bills': 5,
        'categorias': 6,
        'inventario': 7,
        'settings': 8
    };

    return tabMap[this._type] ?? 8;
  }
}
