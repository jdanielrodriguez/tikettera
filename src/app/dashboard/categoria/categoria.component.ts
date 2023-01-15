import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { NotificationsService } from 'angular2-notifications';
import { CategoriasService } from './../../services/categorias.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ImagenesComponent } from './../../components/imagenes/imagenes.component';
import { Imagen, Menus } from './../../interfaces';
import { Sesion } from './../../metodos';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: []
})
export class CategoriaComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mainService: CategoriasService,
    private mySesion: Sesion,
    private localSt: LocalStorageService,
    private _service: NotificationsService
  ) { }
  @BlockUI() blockUI!: NgBlockUI;
  @ViewChild(ImagenesComponent) imagenPrincipal!: ImagenesComponent;
  sliders: Imagen[] = [
  ];
  public options = {
    timeOut: 2000,
    lastOnBottom: false,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };

  ngOnInit(): void {
    this.getParams();
  }
  navegar(data: Menus, id?: number) {
    this.mySesion.navegar(data, id);
  }
  cargarImagen(resp: Imagen) {
    if (resp && resp.id && resp.id > 0) {
      this.sliders.push(resp);
    }
  }
  guardar(value: any) {
    this.blockUI.start();
    const data1 = {
      tipoItem: value,
      // proveedor: this.mySesion.perfil.proveedores[0],
      imagenes: this.sliders
    };
    const data = {
      tipoItem: this.mySesion.encriptar(JSON.stringify(value)),
      // proveedor: this.mySesion.encriptar(JSON.stringify(this.mySesion.perfil.proveedores[0])),
      imagenes: this.mySesion.encriptar(JSON.stringify(this.sliders))
    };
    // this.mainService.create(data)
    //   .then((response: { status: number, objeto: TipoItem, msg: string }) => {
    //     if (response.status >= 400) {
    //       this.createError(response.msg);
    //     } else {
    //       this.createSuccess(this._producto.id ? 'Categoria Creada' : 'Categoria Actualizada');
    //       this._producto = response.objeto;
    //       const men: Menus = {
    //         url: './dashboard/categorias/' + this._producto.nombre,
    //         nombre: this._producto.nombre
    //       };
    //       this.mySesion.navegar(men, 0);
    //     }
    //     this.blockUI.stop();
    //   }).catch(error => {
    //     this.createError('Error ingresando clasificacion');
    //     this.blockUI.stop();
    //   });

  }
  getParams() {
    // this._producto.nombre = this.route.snapshot.paramMap.get('producto');

    // if (this.mySesion.validarSesion() && this._producto.nombre !== 'nuevo') {
    //   this.cargarClasificacion(this._producto.nombre);
    // }
    // if (this._producto.nombre === 'nuevo') {
    //   this._producto.nombre = '';
    //   this._producto.descripcion = '';
    //   this._producto.imagenes = [];
    // }
  }
  cargarClasificacion(nombre?: string) {
    const data = {
      // id: this.mySesion.perfil.proveedores[0].id,
      estado: nombre ? btoa(nombre) : '',
      filter: 'nombre'
    };
    // this.mainService.getAllFilter(data)
    //   .then((response: TipoItem[]) => {
    //     if (response && response.length > 0) {
    //       if (response[0].id > 0) {
    //         this._producto = response[0];
    //         this.sliders = this._producto.imagenes;
    //       }
    //     } else {
    //       const men: Menus = {
    //         url: './../dashboard/categorias',
    //         nombre: 'prueba'
    //       };
    //       this.mySesion.navegar(men, null);
    //     }
    //   })
    //   .catch(error => {
    //     const men: Menus = {
    //       url: './../dashboard/categorias',
    //       nombre: 'prueba'
    //     };
    //     this.mySesion.navegar(men, null);
    //     this.createError(error);
    //   });
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }
  createError(error: string) {
    this._service.error('¡Error!', error);
  }
}
