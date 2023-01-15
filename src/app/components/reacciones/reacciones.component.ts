import { Component, OnInit, Input } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { InteresesService } from './../../services/intereses.service';
import { NotificationsService } from 'angular2-notifications';
import { Sesion } from './../../metodos';
import { FilterGET, Reaccion } from './../../interfaces';
@Component({
  selector: 'app-reacciones',
  templateUrl: './reacciones.component.html',
  styleUrls: ['./reacciones.component.css']
})
export class ReaccionesComponent implements OnInit {
  constructor(
    private _service: NotificationsService,
    private mySesion: Sesion,
    private mainService: InteresesService
  ) { }
  set reaccion(value: Reaccion) {
    this._reaccion = value;
  }
  get reaccion(): Reaccion {
    return this._reaccion;
  }
  get sesion(): boolean {
    return this.mySesion.validarSesion();
  }
  @BlockUI() blockUI!: NgBlockUI;
  private _reaccion!: Reaccion;
  public options = {
    timeOut: 2000,
    lastOnBottom: false,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200,
  };

  ngOnInit(): void {
  }

  obtenerLike(value?: any) {
    if (value && value.id) {
      const data: FilterGET = {
        id: this.mySesion.perfil.id,
        filter: 'inventario-mio',
        estado: value.id + '',
      };
      if (data.id) {
        this.blockUI.start();
        this.mainService.getAllFilter(data)
          .then((response: Reaccion[]) => {
            if (response.length > 0) {
              response.forEach((element: Reaccion) => {
                this._reaccion = element;
              });
            }
            this.blockUI.stop();
          }).catch(error => {
            this.blockUI.stop();
          });
      }
    }
  }
  darLike(value?: any, like?: boolean) {
    if (value && value.id) {
      this.blockUI.start();
      const data: Reaccion = new Reaccion();
      data.default = like ? 1 : 0;
      data.usuario = this.mySesion.perfil.id;
      this.mainService.create(data)
        .then((element: Reaccion) => {
          this._reaccion = element;
          this.blockUI.stop();
        }).catch(error => {
          this.blockUI.stop();
          if (error.indexOf('401') >= 0) {
            alert('Su sesion ha vencido');
            this.mySesion.navegar({ url: '../../../../../logout' });
          }
        });
    }
  }
  quitarLike(value: Reaccion) {
    if (value.id) {
      this.blockUI.start();
      const data: Reaccion = value;
      // this.mainService.delete(data.id)
      //   .then((element: Reaccion) => {
      //     this._reaccion = new Reaccion();
      //     this.blockUI.stop();
      //   }).catch(error => {
      //     this.blockUI.stop();
      //   });
    }
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }
  createError(error: string) {
    this._service.error('¡Error!', error);
  }
  createWarning(error: string) {
    this._service.warn('¡Cuidado!', error);
  }

}
