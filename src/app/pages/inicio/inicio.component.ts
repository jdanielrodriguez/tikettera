import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { listaBusqueda, sliders } from './../../default';
import { ListaBusqueda, Locality } from './../../interfaces';
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

  set offset(value: number) {
    this._offset = value;
  }
  get offset(): number {
    const actual = (this.page - 1) * this.limit;
    this._offset = actual;
    return this._offset;
  }
  get mainLista(): ListaBusqueda[] {
    return this._mainList;
  }
  get mainListaAuxiliar(): ListaBusqueda[] {
    return this._mainList;
  }

  @BlockUI() blockUI!: NgBlockUI;
  public numReg = 0;
  public limit = 10;
  private _offset = 0;
  public page = 1;
  public active = 1;
  public galleryType = 'grid';
  public sliders = sliders(5);
  private _mainList: ListaBusqueda[] = listaBusqueda(20);
  private _mainListAuxiliar: ListaBusqueda[] = this._mainList;

  ngOnInit(): void {
    this.getMainList();
  }

  getMainList() {
    this.blockUI.start();
    const request = this.localitiesService.getAllActive()
      .subscribe({
        next: (response: { status: number, count: number, data: Locality[] }) => {
          this.numReg = response.count;
          this._mainList.length = 0;
          this._mainListAuxiliar.length = 0;
          try {
            response.data.forEach((element: Locality) => {
              const datas: ListaBusqueda = {
                imagen: ('https://via.placeholder.com/250x200'),
                nombre: element.name ? element.name : 'No Name',
                id: element.id,
                slug: element.slug,
                validacion: 5,
              };
              this._mainList.push(datas);
            });
            this._mainListAuxiliar = this._mainList;
          } catch (exception) {
            console.log(exception);
          } finally {
            this.blockUI.stop();
          }
        },
        error: (error) => {
          this.blockUI.stop();
          this.createError(error);
        },
        complete: () => { request.unsubscribe(); }
      });
  }

  cambioPagina(value: any) {
    this.page = value;
    this.getMainList();
  }

  needMax() {
    return (this.sliders.length === 0 && ((this.mainLista.length <= 4 && this.galleryType === 'grid') || (this.mainLista.length < 4 && this.galleryType === 'list')))
  }

  createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }

  createError(error: string) {
    this._service.error('¡Error!', error);
  }
}
