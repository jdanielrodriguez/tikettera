import { Component, OnInit, Input } from '@angular/core';
import { ListaBusqueda } from './../../../interfaces';
@Component({
  selector: 'app-stepper-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class StepperPlacesComponent implements OnInit {
  constructor() { }
  @Input() public data: ListaBusqueda = new ListaBusqueda();
  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.data)
    }, 1000);
  }
}
