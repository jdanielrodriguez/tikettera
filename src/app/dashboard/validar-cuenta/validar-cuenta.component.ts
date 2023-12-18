import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedoresService } from './../../services/proveedores.service';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Perfil } from './../../interfaces';
import { Sesion } from '../../common/sesion';
@Component({
  selector: 'app-validar-cuenta',
  templateUrl: './validar-cuenta.component.html',
  styleUrls: []
})
export class ValidarCuentaComponent implements OnInit {
  constructor(
    private proveedorService: ProveedoresService,
    private route: ActivatedRoute,
    private _service: NotificationsService,
    private mySesion: Sesion,
  ) { }
  set perfil(value: Perfil) {
    this._perfil = value;
  }
  get perfil(): Perfil {
    return this._perfil ? this._perfil : this.mySesion.perfil;
  }
  set token(value: string | null) {
    this._token = value;
  }
  get token(): string | null {
    return this._token;
  }
  get tokenAccepted(): boolean {
    return this._tokenAccepted;
  }
  @BlockUI() blockUI!: NgBlockUI;
  private _token:string | null = '';
  private _perfil!: Perfil;
  private _tokenAccepted = true;
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
    this.getParams();
  }
  getParams() {
    if (this.mySesion.validarSesion()) {
      this._token = this.route.snapshot.paramMap.get('token');
      // this.verificarToken(this._token, this.proveedor.id);
    } else {
      this.mySesion.navegar({ url: '../../../dashboard/perfil' }, 0);
    }
  }
  verificarToken(token: string, id: number) {
    const data = {
      id,
      estado: token,
      filter: 'token'
    };
    this.blockUI.start();
    this.proveedorService.getAllFilter(data)
      .then((response: Perfil) => {
        // if (response.proveedores.length > 0 && response.proveedores[0].estado === 2) {
        //   this.createSuccess('Correo Verificado');
        //   this._perfil = response;
        // }
        this.blockUI.stop();
      })
      .catch(error => {
        error = error.error;
        if (error.status && error.status === 402) {
          this._tokenAccepted = false;
          if (error.obj) {
            this.perfil = this.perfil;
            // if (this._perfil.proveedores.length > 0) {
            //   this._perfil.proveedores[0] = error.obj;
            // } else {
            //   this._perfil.proveedores = [error.obj];
            // }
          }
        }
        this.blockUI.stop();
        this.createInfo('Correo ya verificado');
      });
    this.mySesion.actualizaPerfil(this.perfil);
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }
  createError(error: string) {
    this._service.error('¡Error!', error);
  }
  createInfo(error: string) {
    this._service.info('¡Alerta!', error);
  }
}
