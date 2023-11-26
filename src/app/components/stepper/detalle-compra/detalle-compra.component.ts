import { Component, OnInit, Input } from '@angular/core';
import { ListaBusqueda } from '../../../interfaces';
@Component({
  selector: 'app-stepper-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.scss']
})
export class StepperDetalleCompraComponent implements OnInit {
  constructor() { }
  @Input() public data: ListaBusqueda = new ListaBusqueda();
  ngOnInit(): void {
  }
}
