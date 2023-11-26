import { Component, OnInit, Input } from '@angular/core';
import { ListaBusqueda } from './../../interfaces';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  constructor() { }
  @Input() public step = 1;
  @Input() public data: ListaBusqueda = new ListaBusqueda();

  ngOnInit(): void {
  }
}
