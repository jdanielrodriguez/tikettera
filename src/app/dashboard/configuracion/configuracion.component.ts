import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Perfil } from './../../interfaces';
import { Sesion } from './../../metodos';
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: []
})
export class ConfiguracionComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _service: NotificationsService,
    private mySesion: Sesion
  ) { }
  get perfil(): Perfil {
    return this.mySesion.perfil;
  }
  get type(): string | null {
    return this._type;
  }
  set type(value: string | null) {
    this._type = value;
  }
  private _type:string | null = '';
  public options = {
    position: ['bottom', 'right'],
    timeOut: 2000,
    lastOnBottom: false,
    animate: 'scale',
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };
  ngOnInit(): void {
    this.getParams();
  }
  getParams() {
    this._type = this.route.snapshot.paramMap.get('tipo');
  }
  obtenerPerfil(value: Perfil) {
    this.mySesion.actualizaPerfil(value);
    this.mySesion.actualizaPerfil();
    if (this.mySesion.validarSesion()) {
      this.createSuccess('Se actualizo su informacion');
    }
  }
  public createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }
  public createError(error: string) {
    this._service.error('¡Error!', error);
  }
}
