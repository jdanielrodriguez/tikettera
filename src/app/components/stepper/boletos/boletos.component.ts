import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListaBusqueda, Place } from '../../../interfaces';
@Component({
  selector: 'app-stepper-boletos',
  templateUrl: './boletos.component.html',
  styleUrls: ['./boletos.component.scss']
})
export class StepperBoletosComponent implements OnInit {
  @Input() public data: ListaBusqueda = new ListaBusqueda();
  @Output() changeStep = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedPlacesChange(selectedPlaces: Place[]) {
    this.data.selectedPlaces = selectedPlaces;
  }

  moveToStep(step: number) {
    this.changeStep.emit(step);
  }

  getPlaces(): Place[] {
    return this.data.defaultPlaces ?? [];
  }

  getSelectedPlaces(): Place[] {
    return this.data.selectedPlaces ?? [];
  }
}
