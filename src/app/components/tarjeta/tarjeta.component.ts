import { Component, OnInit, Input } from '@angular/core';
import { MetodoPago } from 'src/app/interfaces';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  private _data: MetodoPago = new MetodoPago();
  private _frente = false;
  private _isCollapsed = true;
  constructor() { }
  ngOnInit(): void {
  }
  girarTarjeta(value?: boolean, event?:any) {
    this.frente = (value != null) ? value : !this._frente;
  }
  @Input()
  set frente(value: boolean) {
    this._frente = value;
  }
  get frente(): boolean {
    return this._frente;
  }
  @Input()
  set isCollapsed(value: boolean) {
    this._isCollapsed = value;
  }
  get isCollapsed(): boolean {
    return this._isCollapsed;
  }
  @Input()
  set data(value: MetodoPago) {
    this._data = value;
  }
  get data(): MetodoPago {
    return this._data;
  }
  get tipoTarjeta(): string {
    // if (this._data && this._data.numeroTC.length > 1) {
    //   if (this._data.numeroTC.replace(/ /g, '').match(/^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/)) {
    //     return './../../../assets/images/tarjeta/logos/visa.png';
    //   } else
    //     if (this._data.numeroTC.replace(/ /g, '').match(/^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/)) {
    //       return './../../../assets/images/tarjeta/logos/mastercard.png';
    //     } else {
    //       return './../../../assets/images/tarjeta/logos/visa.png';
    //     }
    // } else {
    //   return './../../../assets/images/tarjeta/logos/visa.png';
    // }
    return '';
  }
}
