import { Component, OnInit, Input } from '@angular/core';
import { listaBusqueda, sliders } from './../../../default';
import { ListaBusqueda } from './../../../interfaces';
@Component({
  selector: 'app-stepper-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class StepperPlacesComponent implements OnInit {

  constructor() { }
  @Input() public step = 1;

  private _mainList: ListaBusqueda[] = listaBusqueda(4);
  public galleryType = 'grid';

  get mainLista(): ListaBusqueda[] {
    return this._mainList;
  }
  get mainListaAuxiliar(): ListaBusqueda[] {
    return this._mainList;
  }

  ngOnInit(): void {
  }
  needMax() {
    return (this.mainLista.length <= 4 && this.galleryType === 'grid') || (this.mainLista.length < 4 && this.galleryType === 'list')
  }
}
