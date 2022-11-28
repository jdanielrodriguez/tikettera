import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Proveedor, ListaBusqueda } from './../../interfaces';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: []
})
export class InicioComponent implements OnInit {
  constructor(
    private _service: NotificationsService,
  ) { }
  set numReg(value: number) {
    this._numReg = value;
  }
  get numReg(): number {
    return this._numReg;
  }
  set limit(value: number) {
    this._limit = value;
  }
  get limit(): number {
    return this._limit;
  }
  set offset(value: number) {
    this._offset = value;
  }
  get offset(): number {
    const actual = (this.page - 1) * this._limit;
    this._offset = actual;
    return this._offset;
  }
  set page(value: number) {
    this._page = value;
  }
  get page(): number {
    return this._page;
  }
  set proveedoresLista(value: ListaBusqueda[]) {
    this._proveedoresLista = value;
  }
  get proveedoresLista(): ListaBusqueda[] {
    return this._proveedoresLista;
  }
  get proveedoresListaAuxiliar(): ListaBusqueda[] {
    return this._proveedoresLista;
  }
  set proveedor(value: ListaBusqueda) {
    this._proveedor = value;
  }
  get proveedor(): ListaBusqueda {
    return this._proveedor;
  }
  @BlockUI() blockUI!: NgBlockUI;
  private _proveedor: ListaBusqueda = new ListaBusqueda();
  private _numReg = 0;
  private _limit = 10;
  private _offset = 0;
  private _page = 1;
  active = 1;
  sliders = [{ url: 'https://placehold.it/500x250?text=Cargando...', titulo: '', descripcion: '' }];
  private _proveedoresLista: ListaBusqueda[] = [
    {
      id: 1,
      nombre: 'Cargando...',
      imagen: 'https://placehold.it/500x250?text=Cargando...',
    },
    {
      id: 1,
      nombre: 'Cargando...',
      imagen: 'https://placehold.it/500x250?text=Cargando...',
    },
    {
      id: 1,
      nombre: 'Cargando...',
      imagen: 'https://placehold.it/500x250?text=Cargando...',
    }, {
      id: 1,
      nombre: 'Cargando...',
      imagen: 'https://placehold.it/500x250?text=Cargando...',
    }
  ];
  private _proveedoresListaAuxiliar: ListaBusqueda[] = this._proveedoresLista;
  public options = {
    timeOut: 2000,
    lastOnBottom: false,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };

  ngOnInit(): void {
  }

  cargarProveedor(value: ListaBusqueda) {
    if (value.id) {
      // this._proveedor = value;
      // this._proveedoresLista = this._proveedoresLista.filter((v: ListaBusqueda) =>
      //   v.nombre.toLowerCase().indexOf(value.nombre.toLowerCase()) > -1);
    } else {
      this._proveedor = new ListaBusqueda();
      this._proveedoresLista = this._proveedoresListaAuxiliar;
    }
  }

  cargarProveedores() {
    this.blockUI.start();
    const data = {
      id: 0,
      estado: 0,
      filter: 'proveedor&limit=' + this.limit + '&offset=' + this.offset + '&estado=1'
    };
    // this.proveedorService.getAll(data)
    //   .then((response: { status: number, numReg: number, objeto: Proveedor[] }) => {
    //     this._numReg = response.numReg;
    //     this._proveedoresLista.length = 0;
    //     this._proveedoresListaAuxiliar.length = 0;
    //     try {
    //       response.objeto.forEach((element: Proveedor) => {
    //         const datas: ListaBusqueda = {
    //           imagen: (element.imagenes && element.imagenes.length > 0) ? element.imagenes[0].url
    //             : ((element.usuario.imagenes && element.usuario.imagenes.length > 0) ? element.usuario.imagenes[0].url
    //               : 'https://placehold.it/250x200'),
    //           nombre: element.nombre ? element.nombre : 'No Name',
    //           id: element.id,
    //           validacion: 5,
    //           inventario: null
    //         };
    //         this._proveedoresLista.push(datas);
    //       });
    //       const prov = new ListaBusqueda();
    //       prov.nombre = '';
    //       this.cargarProveedor(prov);
    //       this._proveedoresListaAuxiliar = this._proveedoresLista;
    //       this.sliders.length = 0;
    //     } catch (exception) {
    //       console.log(exception);
    //     } finally {
    //       this.blockUI.stop();
    //     }
    //   })
    //   .catch(error => {
    //     this.blockUI.stop();
    //     this.createError(error);
    //   });
  }

  cambioPagina(value: any) {
    this._page = value;
    this.cargarProveedores();
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }
  createError(error: string) {
    this._service.error('¡Error!', error);
  }
}
