import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Place } from './../../interfaces';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit, OnChanges {
  @Input() public places: Place[] = [];
  @Input() public selectedPlaces: Place[] = [];
  @Input() public width: number = 500;
  @Input() public height: number = 400;
  @Input() public svgWidth: number = 10;
  @Input() public svgHeight: number = 10;
  @Input() public espaciado: number = 10;
  @Output() selectedPlacesChange = new EventEmitter<Place[]>();
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['places'] && !changes['places'].firstChange) {
      this.rederPlaces();
    }
  }

  toggleSeat(place: Place): void {
    if (this.selectedPlaces.includes(place)) {
      this.selectedPlaces = this.selectedPlaces.filter(p => p !== place);
    } else {
      this.selectedPlaces.push(place);
    }
    this.selectedPlacesChange.emit(this.selectedPlaces);
  }

  rederPlaces() {
    if (this.places && this.places.some(place => place.x == null || place.y == null)) {
      let fila = 6;
      let columna = 0;
      const numAsientosPorFila = 10;
      const anchoTotalAsientos = numAsientosPorFila * this.svgWidth;
      const margenInicial = (this.width - anchoTotalAsientos) / 3;

      this.places.forEach((place, index) => {
        if (index % numAsientosPorFila === 0 && index !== 0) {
          fila++;
          columna = 0;
        }
        place.x = margenInicial + columna * this.espaciado;
        place.y = fila * this.espaciado;
        columna++;
      });
    }
  }

  imgPlace(place: Place) {
    return this.selectedPlaces.includes(place) ? '../.../../assets/images/icons/taked-place-selected.png' : '../.../../assets/images/icons/empty-place.png'
  }

  getImg(key: string) {
    switch (key) {
      case 'background':
        return '../.../../assets/images/backgrounds/inmueble.svg';
      case 'escenario':
        return '../.../../assets/images/backgrounds/escenario.svg';
      default:
        return '../.../../assets/images/backgrounds/background-place.svg';
    }
  }
}
