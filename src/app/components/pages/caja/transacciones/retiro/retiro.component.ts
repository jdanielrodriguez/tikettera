import { Component, OnInit, Input } from '@angular/core';
import { Caja, Pasarela, Comision } from 'src/app/interfaces';

@Component({
  selector: 'app-caja-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: []
})
export class RetiroComponent implements OnInit {
  private _pasarela: Pasarela = new Pasarela();
  private _comision: Comision = new Comision();
  private _retiro: Comision = new Comision();
  public active = 1;
  private _caja: Caja = new Caja();
  constructor() { }


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
}
