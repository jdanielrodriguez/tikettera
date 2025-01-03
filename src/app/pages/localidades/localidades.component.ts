import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { listaBusqueda, sliders } from './../../default';
import { ListaBusqueda, Locality, ResponseEvent } from './../../interfaces';
import { Sesion } from './../../common/sesion';
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

  public numReg = 0;
  public limit = 10;
  private _offset = 0;
  public page = 1;
  public slug = '';
  public galleryType = 'list';
  public active = 1;
  public sliders = sliders(0);
  public mainLista: ListaBusqueda[] = listaBusqueda(4);
  public mainListaAuxiliar: ListaBusqueda[] = this.mainLista;

  ngOnInit(): void {
    this.mySesion.scrollTop();
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
          this.mainLista.length = 0;
          this.mainListaAuxiliar.length = 0;
          if (!response.cripto) {
            this.mySesion.loadingStop();
            return;
          }
          this.numReg = response.count || 0;
          try {
            const obj = response.cripto ? JSON.parse(this.mySesion.desencriptar(response.cripto)) : null;
            obj.localities.forEach((element: Locality) => {
              const datas: ListaBusqueda = {
                imagen: ('https://via.placeholder.com/250x200'),
                nombre: element.name || 'No Name',
                id: element.id,
                slug: element.slug || '',
                event_slug: obj.slug || '',
                validacion: 5,
                date_start: obj.date_start ? new Date(obj.date_start) : new Date(),
                time_start: obj.time_start || '',
                name: element.name || '',
                description: element.description || '',
                address: obj.address || '',
                price: element.price || 0,
                total: element.price || 0,
                tasa_iva: element.tasa_iva || 0,
                tasa_cambio: element.tasa_cambio || 0,
              };
              this.mainLista.push(datas);
            });
            this.mainListaAuxiliar = this.mainLista;
          } catch (exception) {
            console.log(exception);
          } finally {
            this.mySesion.loadingStop();
          }
        },
        error: (error) => {
          this.mySesion.loadingStop();
          this.mySesion.createError(error.error.message);
        },
        complete: () => { this.mySesion.loadingStop(); request.unsubscribe(); }
      });
  }

  cambioPagina(value: any) {
    this.page = value;
    this.getMainList();
  }

  needMax() {
    return (this.sliders.length === 0 && ((this.mainLista.length <= 4 && this.galleryType === 'grid') || (this.mainLista.length < 3 && this.galleryType === 'list')))
  }

  needFit() {
    return this.sliders.length === 0
  }
}
