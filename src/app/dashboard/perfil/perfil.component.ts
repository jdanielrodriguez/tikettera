import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './../../services/usuarios.service';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Proveedor, Perfil } from './../../interfaces';
import { Sesion } from '../../metodos';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: []
})
export class PerfilComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  private _perfil!: Perfil;
  constructor(
    private usuariosService: UsuariosService,
    private _service: NotificationsService,
    private mySesion: Sesion,
  ) { }

  ngOnInit(): void {
    this.mySesion.actualizaPerfil();
    this.obtenerPerfil();
  }

  obtenerPerfil() {
    this.blockUI.start();
    if (this.perfil.id) {
      this.usuariosService.getSingle(this.perfil.id)
        .then((response: Perfil) => {
          this.createSuccess('Datos cargados Correctamente');
          this._perfil = response;
          this.mySesion.actualizaPerfil(response);
          this.blockUI.stop();
        })
        .catch(error => {
          this.blockUI.stop();
          this.createError(error);
        });
      this.mySesion.actualizaPerfil(this.perfil);
    }
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }
  createError(error: string) {
    this._service.error('¡Error!', error);
  }
  set perfil(value: Perfil) {
    this._perfil = value;
  }
  get perfil(): Perfil {
    return this._perfil ? this._perfil : this.mySesion.perfil;
  }
  get proveedor(): Proveedor | null {
    return null;//this.mySesion.perfil.proveedores.length > 0 ? this.mySesion.perfil.proveedores[0] : new Proveedor();
  }
}
