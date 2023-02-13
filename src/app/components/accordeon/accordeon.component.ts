import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ListaBusqueda } from '../../interfaces';

@Component({
  selector: 'app-accordeon',
  templateUrl: './accordeon.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./accordeon.component.scss']
})
export class AccordeonComponent implements OnInit {

  constructor() { }
  @Input() data: ListaBusqueda = new ListaBusqueda();
  @Input() lista: ListaBusqueda[] = [];
  @Input() tieneDetalle = false;
  @Input() editar!: boolean;
  @Input() eliminarCarrito = false;
  @Input() agregaCarrito = false;
  @Input() categorias = false;
  @Input() adminProv = false;
  @Input() esAdmin = false;
  @Input() autorizaNav = true;
  @Input() pagar = false;
  @Input() proveedor = '';
  @Input() disabled = false;

  ngOnInit(): void {
    // console.log(this.data);
  }

  getUrl(data: ListaBusqueda): string {
    return ((data.imagenes != null && data.imagenes.length > 0) ? data.imagenes[0].url : data.imagen ? data.imagen : 'https://via.placeholder.com/250X200?text=X');
  }
  getPrecio(data: ListaBusqueda): string {
    let total = 0.0;
    const num = new Number(total);
    return num.toFixed(2);
  }
  getTotal(data: ListaBusqueda): string {
    let total = 0.0;
    const num = new Number(total);
    return num.toFixed(2);
  }
}
