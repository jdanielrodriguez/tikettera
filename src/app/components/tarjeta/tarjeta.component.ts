import { Component, OnInit, Input } from '@angular/core';
import { MetodoPago } from 'src/app/interfaces';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  @Input() data: MetodoPago = new MetodoPago();
  @Input() frente = false;
  @Input() isCollapsed = true;
  constructor() { }
  ngOnInit(): void {
  }
  girarTarjeta(value?: boolean, event?:any) {
    this.frente = (value != null) ? value : !this.frente;
  }
  get tipoTarjeta(): string {
    if (this.data && this.data.numeroTC?.length > 1) {
      if (this.data.numeroTC.replace(/ /g, '').match(/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/)) {
        return './../../../assets/images/tarjeta/logos/visa.png';
      } else
        if (this.data.numeroTC.replace(/ /g, '').match(/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/)) {
          return './../../../assets/images/tarjeta/logos/mastercard.png';
        } else {
          return './../../../assets/images/tarjeta/logos/visa.png';
        }
    } else {
      return './../../../assets/images/tarjeta/logos/visa.png';
    }
  }
}
