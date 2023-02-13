import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { listaBusqueda, sliders } from './../../default';
import { ListaBusqueda, Locality, ResponseEvent } from './../../interfaces';
import { Sesion } from './../../metodos';
import { LocalitiesService } from './../../services/localities.service';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.scss']
})
export class LocalidadesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private mySesion: Sesion,
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

  public numReg = 0;
  public limit = 10;
  private _offset = 0;
  public page = 1;
  public slug = '';
  public galleryType = 'list';
  public active = 1;
  public sliders = sliders(0);
  private _mainList: ListaBusqueda[] = listaBusqueda(4);
  private _mainListAuxiliar: ListaBusqueda[] = this._mainList;

  ngOnInit(): void {
    this.getParams();
    this.getMainList();
  }

  getParams() {
    this.slug = this.route.snapshot.paramMap.get("slug") || '';
  }

  getMainList() {
    this.mySesion.loadingStart();
    const slug = this.mySesion.encriptar(JSON.stringify(this.slug)) || '';
    const request = this.localitiesService.getAllByEvent(slug)
      .subscribe({
        next: (response: ResponseEvent) => {
          this._mainList.length = 0;
          this._mainListAuxiliar.length = 0;
          if (!response.objeto) {
            this.mySesion.loadingStop();
            return;
          }
          this.numReg = response.count ?? 0;
          try {
            console.log(response.objeto);
            response.objeto.localities.forEach((element: Locality) => {
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
            this.mySesion.loadingStop();
          }
        },
        error: (error) => {
          this.mySesion.loadingStop();
          this.mySesion.createError(error);
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
}
