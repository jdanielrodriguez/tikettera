import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthServices } from '../../services/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { ImagenesComponent } from './../../components/imagenes/imagenes.component';
import { Imagen, FilterGET, Configuracion } from '../../interfaces';
import { Sesion } from '../../common/sesion';
declare var $: any;
@Component({
  selector: 'app-correos',
  templateUrl: './correos.component.html',
  styleUrls: ['./correos.component.css']
})
export class CorreosComponent implements OnInit, AfterViewInit {
  constructor(
    private mySesion: Sesion,
    private _service: NotificationsService,
    private authService: AuthServices,
  ) { }

  set titulo(value: string) {
    this._titulo = value;
  }
  get titulo(): string {
    return this._titulo;
  }
  set muestraTexto(value: boolean) {
    this._muestraTexto = value;
  }
  get muestraTexto(): boolean {
    return this._muestraTexto;
  }
  get configuracion(): Configuracion {
    return this._configuracion;
  }
  @BlockUI() blockUI!: NgBlockUI;
  @ViewChild(ImagenesComponent) imagenPrincipal!: ImagenesComponent;
  // private _perfil: Proveedor = new Proveedor();
  private _configuracion!: Configuracion;
  sliders: Imagen[] = [];
  private _titulo!: string;
  private _muestraTexto!: boolean;
  public options = {
    timeOut: 2000,
    lastOnBottom: false,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200,
  };
  ngOnInit(): void {
    $('html, body').animate({ scrollTop: 0 }, '300');
    this.obtenerConfiguraciones();
  }
  ngAfterViewInit() {
    this.validarImagenes();
  }
  eliminarImagenes() {
    this.blockUI.start();
    if (this.sliders.length > 0) {
      // this.authService
      //   .deleteImage(this.sliders[0].id)
      //   .then((element: Imagen) => {
      //     this.sliders = [];
      //     this.blockUI.stop();
      //     this.guardar();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     this.blockUI.stop();
      //   });
    } else {
      this.blockUI.stop();
    }
  }
  obtenerColorTexto(value: string) {
    this._configuracion.css = value;
  }
  obtenerColorBackground(value: string) {
    this._configuracion.color_nav = value;
  }
  obtenerConfiguraciones() {
    this.blockUI.start();
    const data: FilterGET = {
      id: 1,//this.perfil.id,
      estado: '2',
      filter: 'tipo',
    };
    // this.mainService.getAllFilter(data).then((response: Configuracion[]) => {
    //   this._configuracion = response.length > 0 ? response[0] : (new Configuracion(this._perfil.id, 1));
    //   this.sliders = this._configuracion.imagenes;
    //   this.blockUI.stop();
    // }).catch(error => {
    //   if (error.indexOf('401') >= 0) {
    //     this.mySesion.navegar({ url: './logout' });
    //   }
    // });
    this.blockUI.stop();
  }
  cargarImagen(resp: Imagen) {
    // if (resp.id > 0) {
    //   resp.configuracion = this.perfil.id;
    //   this.validarImagenes(resp);
    // }
  }
  validarImagenes(value?: Imagen) {
    if (this.sliders.length > 1) {
      // this.authService
      //   .deleteImage(this.sliders[0].id)
      //   .then((element: Imagen) => {
      //     if (value) {
      //       this.sliders = [value];
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    } else {
      if (value) {
        if (this.sliders.length > 0) {
          // this.authService
          //   .deleteImage(this.sliders[0].id)
          //   .then((element: Imagen) => {
          //     // console.log(element);
          //     this.createWarning(
          //       'Se cargo su nueva imagen de perfil, guarde sus cambios.'
          //     );
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        }
        this.sliders = [value];
      }
    }
  }
  guardar() {
    this.blockUI.start();
    this._configuracion.tipo = 2;
    // const data1 = {
    //   id: this._perfil.id,
    //   imagenes: this.sliders,
    //   proveedor: this._perfil,
    //   configuracion: this._configuracion,
    // };
    const data = {
      id: 1,//this._perfil.id,
      imagenes: btoa(JSON.stringify(this.sliders)),
      proveedor: null,//btoa(JSON.stringify(this._perfil)),
      configuracion: btoa(JSON.stringify(this._configuracion)),
    };
    // this.mainService.create(data).then((response: { status: number, objeto: Configuracion }) => {
    //   this._configuracion = response.objeto;
    //   this.createSuccess('Los datos de su encabezado fueron actualizados');
    //   this.blockUI.stop();
    //   this.obtenerConfiguraciones();
    // });
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
