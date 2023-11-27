import { Component, OnInit, Input } from '@angular/core';
import { ListaBusqueda, Place } from './../../interfaces';
const IVA_RATE = 0.12;

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  @Input() public selectedPlaces: Place[] = [];
  @Input() public data: ListaBusqueda = new ListaBusqueda();

  constructor() { }

  ngOnInit(): void {
  }

  calculateTotal(): number {
    if (!this.selectedPlaces.length) return 0;
    return (this.selectedPlaces.reduce((total, place) => total + (this.data.price ?? 0), 0));
  }

  calculateTotalStr(): string {
    return (this.calculateTotal()).toFixed(2);
  }

  calculateIva(): string {
    return (this.calculateTotal() * IVA_RATE).toFixed(2);
  }

  calculateTotalSinIva(): string {
    return (this.calculateTotal() - (this.calculateTotal() * IVA_RATE)).toFixed(2);
  }
}
