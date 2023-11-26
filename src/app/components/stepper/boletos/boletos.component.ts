import { Component, OnInit, Input } from '@angular/core';
import { ListaBusqueda } from '../../../interfaces';
@Component({
  selector: 'app-stepper-boletos',
  templateUrl: './boletos.component.html',
  styleUrls: ['./boletos.component.scss']
})
export class StepperBoletosComponent implements OnInit {
  constructor() { }
  @Input() public data: ListaBusqueda = new ListaBusqueda();
  ngOnInit(): void {
  }
}
