import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ListaBusqueda } from '../../interfaces';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

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

  ngOnInit(): void {
  }

  getUrl(data: ListaBusqueda): string {
    return ((data.imagenes != null && data.imagenes.length > 0) ? data.imagenes[0].url : data.imagen ? data.imagen : 'https://via.placeholder.com/250X200?text=X');
  }

  resetCarrito(value?: ListaBusqueda): boolean {
    let ret = false;
    if (!this.agregaCarrito && !this.eliminarCarrito && !this.esAdmin) {
    }
    return ret;
  }

  public handleRefusal(dismissMethod?: any): void {
    this.autorizaNav = true;
  }
  autorizarProveedor(value?: ListaBusqueda) {
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
  pruebaConfirm() {

  }
  get proveedorAutStr(): ListaBusqueda {
    return new ListaBusqueda();
  }
}
