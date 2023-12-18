import { Component, Input, OnInit } from '@angular/core';
import { Caja, Comision, Pasarela } from 'src/app/interfaces';
import { Constantes } from 'src/app/common/constant';

@Component({
  selector: 'app-retiro-view',
  templateUrl: './view.component.html',
  styleUrls: []
})
export class ViewRetiroComponent implements OnInit {
  private _caja: Caja = new Caja();
  private _pasarela: Pasarela = new Pasarela();
  private _comision: Comision = new Comision();
  private _retiro: Comision = new Comision();

  constructor(
    private constantes: Constantes
  ) { }

  ngOnInit(): void {
  }

  @Input()
  set caja(value: Caja) {
    this._caja = value;
  }
  get caja(): Caja {
    return this._caja;
  }
  @Input()
  set pasarela(value: Pasarela) {
    this._pasarela = value;
  }
  get pasarela(): Pasarela {
    return this._pasarela;
  }
  @Input()
  set comision(value: Comision) {
    this._comision = value;
  }
  get comision(): Comision {
    return this._comision;
  }
  @Input()
  set retiro(value: Comision) {
    this._retiro = value;
  }
  get retiro(): Comision {
    return this._retiro;
  }
  get precioSIva(): string {
    let count = 0;
    count = parseFloat(this.caja.saldo + '');
    const precioSIva = count / (1 + this.constantes.tasaIva);
    const num = new Number(precioSIva);
    return num.toFixed(2);
  }
  get sIva(): string {
    let count = 0;
    count = parseFloat(this.precioSIva);
    const precioSIva = count * this.constantes.tasaIva;
    const num = new Number(precioSIva);
    return num.toFixed(2);
  }
  get totalRetiro(): string {
    const num = this.retiro ?
      new Number((parseFloat(this.precioSIva) * ((this.retiro.porcentaje ? this.retiro.porcentaje : 1) / 100)) + ((this.retiro.plus ? this.retiro.plus : 1) * (this.retiro.cambio ? this.retiro.cambio : 1))) : 0;
    return num.toFixed(2);
  }
  get totalSinRetiro(): string {
    let count = 0;
    count = (this.caja.saldo ? this.caja.saldo : parseFloat(this.totalRetiro)) - parseFloat(this.totalRetiro);
    const num = new Number(count);
    return num.toFixed(2);
  }
  get saldoS(): string {
    let count = 0;
    count = this.caja.saldo ? this.caja.saldo : 0;
    const num = new Number(count);
    return num.toFixed(2);
  }
  get comisionPasarela(): string {
    let count = 0;
    count = this.caja.pasarelaDebito ? this.caja.pasarelaDebito : 0;
    const num = new Number(count);
    return num.toFixed(2);
  }
  get comisionPlataforma(): string {
    let count = 0;
    count = this.caja.plataformaDebito ? this.caja.plataformaDebito : 0;
    const num = new Number(count);
    return num.toFixed(2);
  }
  get compraTotal(): string {
    let count = 0;
    count = this.caja.creditosTotales ? this.caja.creditosTotales : 0;
    const num = new Number(count);
    return num.toFixed(2);
  }
}
