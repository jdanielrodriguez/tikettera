import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Locality, ListaBusqueda } from './../../interfaces';
import { LocalitiesService } from './../../services/localities.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: []
})
export class InicioComponent implements OnInit {
  constructor(
    private _service: NotificationsService,
    private localitiesService: LocalitiesService
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
    this._localitiesList = value;
  }
  get proveedoresLista(): ListaBusqueda[] {
    return this._localitiesList;
  }
  get proveedoresListaAuxiliar(): ListaBusqueda[] {
    return this._localitiesList;
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
  sliders = [{ url: 'https://via.placeholder.com/500x250.png?text=Cagando...', titulo: '', descripcion: '' }];
  private _localitiesList: ListaBusqueda[] = [
    {
      id: 1,
      nombre: 'Cargando...',
      imagen: 'https://via.placeholder.com/500x250.png?text=Cagando...',
    },
    {
      id: 1,
      nombre: 'Cargando...',
      imagen: 'https://via.placeholder.com/500x250.png?text=Cagando...',
    },
    {
      id: 1,
      nombre: 'Cargando...',
      imagen: 'https://via.placeholder.com/500x250.png?text=Cagando...',
    }, {
      id: 1,
      nombre: 'Cargando...',
      imagen: 'https://via.placeholder.com/500x250.png?text=Cagando...',
    }
  ];
  private _localitiesListAuxiliar: ListaBusqueda[] = this._localitiesList;
  public options = {
    timeOut: 2000,
    lastOnBottom: false,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };

  ngOnInit(): void {
    this.getMainList();
  }

  cargarProveedor(value: ListaBusqueda) {
    if (value.id) {
      // this._proveedor = value;
      // this._localitiesList = this._localitiesList.filter((v: ListaBusqueda) =>
      //   v.nombre.toLowerCase().indexOf(value.nombre.toLowerCase()) > -1);
    } else {
      this._proveedor = new ListaBusqueda();
      this._localitiesList = this._localitiesListAuxiliar;
    }
  }

  getMainList() {
    this.blockUI.start();
    const data = {
      id: 0,
      estado: 0,
      filter: 'proveedor&limit=' + this.limit + '&offset=' + this.offset + '&estado=1'
    };
    this.localitiesService.getAllActive()
      .subscribe((response: { status: number, count: number, data: Locality[] }) => {
        this._numReg = response.count;
        this._localitiesList.length = 0;
        this._localitiesListAuxiliar.length = 0;
        try {
          response.data.forEach((element: Locality) => {
            const datas: ListaBusqueda = {
              imagen: ('https://via.placeholder.com/250x200'),
              nombre: element.name ? element.name : 'No Name',
              id: element.id,
              validacion: 5,
            };
            this._localitiesList.push(datas);
          });
          const prov = new ListaBusqueda();
          prov.nombre = '';
          this.cargarProveedor(prov);
          this._localitiesListAuxiliar = this._localitiesList;
          this.sliders.length = 0;
        } catch (exception) {
          console.log(exception);
        } finally {
          this.blockUI.stop();
        }
      }, (error) => {
        this.blockUI.stop();
        this.createError(error);
      });
  }

  cambioPagina(value: any) {
    this._page = value;
    this.getMainList();
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }
  createError(error: string) {
    this._service.error('¡Error!', error);
  }
}
