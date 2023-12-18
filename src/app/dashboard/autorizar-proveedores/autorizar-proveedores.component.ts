import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ListaBusqueda } from './../../interfaces';
import { Sesion } from '../../common/sesion';
import { Formatos } from '../../common/format';
@Component({
  selector: 'app-autorizar-proveedores',
  templateUrl: './autorizar-proveedores.component.html',
  styleUrls: ['./autorizar-proveedores.component.css']
})
export class AutorizarProveedoresComponent implements OnInit {
  constructor(
    private _service: NotificationsService,
    private mySesion: Sesion,
    private formatear: Formatos,
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
  sliders = [{ url: 'https://via.placeholder.com/500x250?text=NO ENCONTRADO', titulo: '', descripcion: '' }];
  private _proveedoresLista: ListaBusqueda[] = [
    {
      id: 1,
      nombre: 'No Encontrado',
      imagen: 'https://via.placeholder.com/500x250?text=NO ENCONTRADO',
    },
    {
      id: 1,
      nombre: 'No Encontrado',
      imagen: 'https://via.placeholder.com/500x250?text=NO ENCONTRADO',
    },
    {
      id: 1,
      nombre: 'No Encontrado',
      imagen: 'https://via.placeholder.com/500x250?text=NO ENCONTRADO',
    }, {
      id: 1,
      nombre: 'No Encontrado',
      imagen: 'https://via.placeholder.com/500x250?text=NO ENCONTRADO',
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
    this.cargarProveedores();
  }
  cargarProveedor(value: ListaBusqueda) {
    if (value.id) {
      this._proveedor = value;
      // this._proveedoresLista = this._proveedoresLista.filter(
      //   (v: ListaBusqueda) => v.nombre.toLowerCase().indexOf(value.nombre.toLowerCase()) > -1);
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
      filter: 'masqestado&limit=' + this.limit + '&offset=' + this.offset + '&estado=2'
    };
    // this.proveedorService.getAll(data)
    //   .then((response: { status: number, numReg: number, objeto: Proveedor[] }) => {
    //     this._numReg = response.numReg;
    //     this._proveedoresLista.length = 0;
    //     this._proveedoresListaAuxiliar.length = 0;
    //     try {
    //       response.objeto.forEach((element: Proveedor) => {
    //         const datas: ListaBusqueda = {
    //           imagen: element.imagenes?.length > 0 ? element.imagenes[0].url : 'https://via.placeholder.com/250x200',
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
  autorizar(value: ListaBusqueda) {
    const data = {
      id: 0,
      estado: value.nombre ? btoa(value.nombre) : '',
      filter: 'nombre'
    };
    this.blockUI.start();
    // this.proveedorService.getAllFilter(data)
    //   .then((response: Proveedor[]) => {
    //     const tempProveedor = response.length > 0 ? response[0] : new Proveedor();
    //     let proveedor = new Proveedor();
    //     proveedor = tempProveedor as Proveedor;
    //     if (proveedor != null) {
    //       if (proveedor) {
    //         proveedor.nombre = this.formatear.getCleanedString(proveedor.nombre);
    //         proveedor.apellido = this.formatear.getCleanedString(proveedor.apellido);
    //         proveedor.estado = 1;
    //       }
    //       const datas = {
    //         cliente: null,
    //         proveedor: proveedor ? this.mySesion.encriptar(JSON.stringify(proveedor)) : null,
    //         usuario: this.mySesion.perfil ? this.mySesion.encriptar(JSON.stringify(this.mySesion.perfil)) : null,
    //         id: proveedor.id
    //       };
    //       this.proveedorService.update(datas)
    //         .then((element: { status: number, objeto: Proveedor }) => {
    //           if (element.status === 200) {
    //             this.createSuccess('Se autorizo el proveedor ' + proveedor.nombre);
    //             this.blockUI.stop();
    //           }
    //           this.cargarProveedores();
    //           this.blockUI.stop();
    //         }).catch(error => {
    //           this.blockUI.stop();
    //         });
    //     }
    //   })
    //   .catch(error => {
    //     this.blockUI.stop();
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
