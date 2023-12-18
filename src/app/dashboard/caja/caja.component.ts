import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Perfil } from 'src/app/interfaces';
import { Sesion } from 'src/app/common/sesion';
@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: []
})
export class CajaComponent implements OnInit {
  constructor(
    private mySesion: Sesion,
    private _service: NotificationsService
  ) { }
  get perfil(): Perfil {
    return this.mySesion.perfil;
  }
  public options = {
    timeOut: 2000,
    lastOnBottom: false,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };

  ngOnInit(): void {
    this.mySesion.actualizaPerfil();
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }
  createError(error: string) {
    this._service.error('¡Error!', error);
  }
}
