import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MetodoPago, Pasarela } from './../../interfaces';
import { Sesion } from './../../common/sesion';
import { ComisionesService } from './../../services/comisiones.service';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: []
})
export class MetodoPagoComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  private _dinamicLink = '';
  private _activarModal = false;
  private _data: EventEmitter<MetodoPago> = new EventEmitter<MetodoPago>();
  private _pasarelas!: [Pasarela];
  private _regresar: EventEmitter<string> = new EventEmitter<string>();
  private _tcSelect: MetodoPago = new MetodoPago();
  constructor(
    private mySesion: Sesion,
    private comisionesService: ComisionesService
  ) { }

  ngOnInit(): void {
    this._activarModal = !this.validarSesion;
    this.cargarPasarelas();
  }
  seleccionarFormaPago(tipo: string, value: MetodoPago, cambio?: Pasarela) {
    value.tipo = tipo;
    this._tcSelect = value;
    this.tcSelect.cambio = cambio ? cambio.cambio : 0;
    this.tcSelect.pasarela = cambio ? cambio.id : 0;
    this._data.emit(this._tcSelect);
  }
  async cargarPasarelas() {
    this.blockUI.start();
    const data = {
      id: 0,
      estado: 1,
      filter: 'estados'
    };
    await this.comisionesService.getPasarelasFilter(data)
      .then((response: [Pasarela]) => {
        this._pasarelas = response;
        this.blockUI.stop();
      })
      .catch(error => {
        this.blockUI.stop();
        if (error.status === 401 && !error.ok) {
          this.mySesion.navegar({ url: './logout' });
        }
      });
  }
  regresaMetodoPago() {
    this._regresar.emit('metodos-pago');
  }
  regresaDireccion() {
    this._regresar.emit('direcciones');
  }
  set activarModal(value: boolean) {
    this._activarModal = value;
  }
  get activarModal(): boolean {
    return this._activarModal;
  }
  get necesitaLogin(): boolean {
    return !this.mySesion.validarSesion();
  }
  get validarSesion(): boolean {
    return this.mySesion.validarSesion();
  }
  @Input()
  set dinamicLink(value: string) {
    this._dinamicLink = value;
  }
  get dinamicLink(): string {
    return this._dinamicLink;
  }
  @Output()
  get data(): EventEmitter<MetodoPago> {
    this._data.emit(this._tcSelect);
    return this._data;
  }
  @Output()
  get regresar(): EventEmitter<string> {
    this._regresar.emit('direcciones');
    return this._regresar;
  }
  get tcSelect(): MetodoPago {
    return this._tcSelect;
  }
  @Input()
  set tcSelect(value: MetodoPago) {
    this._tcSelect = value;
  }
  set pasarelas(value: [Pasarela]) {
    this._pasarelas = value;
  }
  get pasarelas(): [Pasarela] {
    return this._pasarelas;
  }
}
