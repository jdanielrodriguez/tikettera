import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Sesion } from '../../metodos';
import { Perfil } from './../../interfaces';
import { UsuariosService } from './../../services/usuarios.service';
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
    private mySesion: Sesion,
  ) { }

  ngOnInit(): void {
    this.mySesion.actualizaPerfil();
    this.obtenerPerfil();
  }

  obtenerPerfil() {
    this.blockUI.start();
    if (this.perfil.id) {
      const request = this.usuariosService.getSingle(this.perfil.id)
        .subscribe({
          next: (response: Perfil) => {
            this.mySesion.createSuccess('Datos cargados Correctamente');
            this._perfil = response;
            this.mySesion.actualizaPerfil(response);
            this.blockUI.stop();
          },
          error: (error) => {
            this.blockUI.stop();
            this.mySesion.createError(error);
          },
          complete: () => { request.unsubscribe(); }
        });
      this.mySesion.actualizaPerfil(this.perfil);
    }
  }
  set perfil(value: Perfil) {
    this._perfil = value;
  }
  get perfil(): Perfil {
    return this._perfil ? this._perfil : this.mySesion.perfil;
  }
  get proveedor(): null {
    return null;//this.mySesion.perfil.proveedores.length > 0 ? this.mySesion.perfil.proveedores[0] : new Proveedor();
  }
}
