import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { sliders } from './../../default';
import { ListaBusqueda, ResponseLocality } from './../../interfaces';
import { Sesion } from './../../common/sesion';
import { LocalitiesService } from './../../services/localities.service';

@Component({
  selector: 'app-boletos',
  templateUrl: './boletos.component.html',
  styleUrls: ['./boletos.component.scss']
})
export class BoletosComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private mySesion: Sesion,
    private localitiesService: LocalitiesService
  ) { }

  public slug = '';
  public event_slug = '';
  public active = 2;
  public sliders = sliders(0);
  public data: ListaBusqueda = new ListaBusqueda();

  ngOnInit(): void {
    this.mySesion.scrollTop();
    this.getParams();
    this.getMain();
    this.data.name = this.event_slug;
  }

  getParams() {
    this.event_slug = this.route.snapshot.paramMap.get("event_slug") || '';
    this.slug = this.route.snapshot.paramMap.get("slug") || '';
  }

  getMain() {
    this.mySesion.loadingStart();
    const slug = this.mySesion.encriptar(JSON.stringify(this.slug)) || '';
    const event_slug = this.mySesion.encriptar(JSON.stringify(this.event_slug)) || '';
    const request = this.localitiesService.getLocalityByEvent([event_slug, slug])
      .subscribe({
        next: (response: ResponseLocality) => {
          if (!response.objeto) {
            this.mySesion.loadingStop();
            return;
          }
          try {
            const obj = response.objeto;
            const datas: ListaBusqueda = {
              imagen: ('https://via.placeholder.com/250x200'),
              nombre: obj.name || 'No Name',
              id: obj.id,
              slug: obj.slug || '',
              event_slug: obj.slug || '',
              validacion: 5,
              date_start: obj.event?.date_start ? new Date(obj.event?.date_start) : new Date(),
              time_start: obj.event?.time_start?.toString() || '',
              name: obj.name || '',
              description: obj.description || '',
              address: obj.event?.address || '',
              price: obj.price || 0,
              total: obj.price || 0,
              tasa_iva: obj.tasa_iva || 0,
              tasa_cambio: obj.tasa_cambio || 0,
              defaultPlaces: obj.places || [],
              selectedPlaces: []
            };
            this.data = datas;
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
}
