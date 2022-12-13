import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CategoriasService } from './../../services/categorias.service';
import { ListaBusqueda, TipoItem, Menus } from './../../interfaces';
import { Sesion } from './../../metodos';
@Component({
  selector: 'app-clasificaciones',
  templateUrl: './clasificaciones.component.html',
  styleUrls: []
})
export class ClasificacionesComponent implements OnInit {
  constructor(
    private mySesion: Sesion,
    private mainService: CategoriasService,
    private _service: NotificationsService
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
  set proveedor(value: any) {
    this._proveedor = value;
  }
  get proveedor(): any {
    return this._proveedor;
  }
  set categoriasLista(value: TipoItem[]) {
    this._categoriasLista = value;
  }
  get categoriasLista(): TipoItem[] {
    return this._categoriasLista;
  }

  set categoriasListaAuxiliar(value: TipoItem[]) {
    this._categoriasListaAuxiliar = value;
  }
  get categoriasListaAuxiliar(): TipoItem[] {
    return this._categoriasListaAuxiliar;
  }
  set categoria(value: ListaBusqueda) {
    this._categoria = value;
  }
  get categoria(): ListaBusqueda {
    return this._categoria;
  }

  private _proveedor = null;
  private _numReg = 0;
  private _limit = 10;
  private _offset = 0;
  private _page = 1;
  @BlockUI() blockUI!: NgBlockUI;
  private _categoriasLista: TipoItem[] = [];
  private _categoriasListaAuxiliar: TipoItem[] = [];
  private _categoria: ListaBusqueda = new ListaBusqueda();
  public options = {
    timeOut: 2000,
    lastOnBottom: false,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };

  ngOnInit(): void {
    this.cargarCategorias();
  }
  cargarCategoria(value: ListaBusqueda) {
    if (value.id) {
      this._categoria = value;
      // this._categoriasLista = this._categoriasLista.filter(
      //   (v: ListaBusqueda) => v.nombre.toLowerCase().indexOf(value.nombre.toLowerCase()) > -1);
    } else {
      this._categoria = new ListaBusqueda();
      this._categoriasLista = this._categoriasListaAuxiliar;
    }
  }
  cargarCategorias() {
    this.blockUI.start();
    const data = {
      id: 0,
      // estado: this.mySesion.perfil.proveedores[0].id,
      filter: 'proveedor&limit=' + this.limit + '&offset=' + this.offset
    };
    this.mainService.getAllFilter(data)
      .then((response: { status: number, numReg: number, objeto: TipoItem[] }) => {
        this._numReg = response.numReg;
        this._categoriasLista.length = 0;
        this._categoriasListaAuxiliar.length = 0;
        try {
          response.objeto.forEach((element: TipoItem) => {
            const datas: ListaBusqueda = {
              imagen: element.portada ? element.portada : 'https://via.placeholder.com/250x200',
              nombre: element.nombre ? element.nombre : 'No Name',
              id: element.id
            };
            this._categoriasLista.push(datas);
          });
          this._categoriasListaAuxiliar = this._categoriasLista;
        } catch (exception) {
          console.log(exception);
        } finally {
          this.blockUI.stop();
        }
      })
      .catch(error => {
        this.blockUI.stop();
        this.createError(error);
      });
  }
  cambioPagina(value: any) {
    this._page = value;
    this.cargarCategorias();
  }
  navegar(data: Menus, id?: number) {
    this.mySesion.navegar(data, id);
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }
  createError(error: string) {
    this._service.error('¡Error!', error);
  }

}

