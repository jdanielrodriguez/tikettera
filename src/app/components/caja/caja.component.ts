import { Component, OnInit, Input } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ComisionesService } from '../../services/comisiones.service';
import { Perfil, Pasarela, Comision, Caja } from '../../interfaces';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Constantes } from '../../common/constant';
import { Sesion } from '../../common/sesion';
declare const $: any;
@Component({
  selector: 'app-caja-view',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  private _perfil: Perfil = new Perfil();
  private _titulo!: string;
  private _muestraTexto!: boolean;
  private _comisionRetiro!: Comision;
  private _pasarela!: Pasarela;
  private _caja: Caja = new Caja();
  modelFinal!: NgbDateStruct;
  modelInicial!: NgbDateStruct;
  date!: { year: number, month: number, day: number };
  dateMin: { year: number, month: number, day: number } = {
    year: this.year,
    month: (new Date()).getMonth() + 1,
    day: 1
  };
  dateInicial!: string;
  dateFinal!: string;
  constructor(
    private mySesion: Sesion,
    private comisionesService: ComisionesService,
    private calendar: NgbCalendar,
    private constantes: Constantes
  ) { }
  ngOnInit(): void {
    $('html, body').animate({ scrollTop: 0 }, '300');
    this.iniciarFecha();
    this.cargarPasarelas();
    this.cargarCaja();
  }
  async cargarPasarelas() {
    this.blockUI.start();
    this.pasarela = await this.comisionesService.cargarPasarelas();
    this.blockUI.stop();
  }
  async cargarComisionRetiro(total: number) {
    this.blockUI.start();
    this.retiro = await this.comisionesService.cargarComisionRetiro(total);
    this.blockUI.stop();
  }
  cargarCaja() {
    const data = {
      id: this.perfil ? this.perfil.id : 0,
      estado: 0,
      filter: 'totales&fechaInicial=' + this.fechaMin + '&fechaFinal=' + this.fechaMax
    };
    this.comisionesService.getTransaccionesFilter(data)
      .then((response: Caja) => {
        this.caja = response;
        this.cargarComisionRetiro(parseFloat(this.precioSIva));
      })
      .catch(error => {
      });
  }
  cargarFecha(iniciar: number) {
    if (iniciar === 1) {
      this.dateInicial = JSON.stringify(this.modelInicial);
    } else {
      this.dateFinal = JSON.stringify(this.modelFinal);
    }
    this.cargarCaja();
  }
  iniciarFecha() {
    if (this.date) {
      if (!this.date.year) {
        this.date.year = new Date().getFullYear();
      }
    }
    if (this.date) {
      this.modelInicial = {
        day: this.dateMin.day ? this.dateMin.day : new Date().getDate(),
        year: this.dateMin.year ? this.dateMin.year : new Date().getFullYear(),
        month: this.dateMin.month ? this.dateMin.month : (new Date().getMonth() + 1)
      };
      this.modelFinal = {
        day: this.date.day ? this.date.day : new Date().getDate(),
        year: this.date.year ? this.date.year : new Date().getFullYear(),
        month: this.date.month ? this.date.month : (new Date().getMonth() + 1)
      };
    } else {
      this.modelFinal = {
        day: (new Date().getDate()),
        year: (new Date().getFullYear()),
        month: (new Date().getMonth() + 1)
      };
      this.modelInicial = {
        day: this.dateMin.day ? this.dateMin.day : new Date().getDate(),
        year: this.dateMin.year ? this.dateMin.year : new Date().getFullYear(),
        month: this.dateMin.month ? this.dateMin.month : (new Date().getMonth() + 1)
      };
    }
  }
  selectToday() {
    // this.modelInicial = this.calendar.getToday();
    this.modelFinal = this.calendar.getToday();
  }
  get year(): number {
    return (new Date().getFullYear());
  }
  @Input()
  set perfil(value: Perfil) {
    this._perfil = value;
  }
  get perfil(): Perfil {
    return this._perfil;
  }
  set retiro(value: Comision) {
    this._comisionRetiro = value;
  }
  get retiro(): Comision {
    return this._comisionRetiro;
  }
  get precioSIva(): string {
    let count = 0;
    // count = this.caja.saldo > 0 ? parseFloat(this.caja.saldo + '') : 0;
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
    const num = parseFloat(this.precioSIva) > 0 ? this.retiro ?
      //new Number((parseFloat(this.precioSIva) * (this.retiro.porcentaje ? this.retiro.porcentaje / 100 : 1)) + (this.retiro.plus * this.retiro.cambio))
      0 : 0 : 0;
    return num.toFixed(2);
  }
  get totalSinRetiro(): string {
    let count = 0;
    // count = parseFloat(this.totalRetiro) >= 0 ? this.caja.saldo - parseFloat(this.totalRetiro) : 0;
    const num = new Number(count);
    return num.toFixed(2);
  }
  get saldo(): string {
    let count = 0;
    // count = this.caja.saldo;
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
    // count = this.caja.creditosTotales > 0 ? this.caja.creditosTotales : 0;
    const num = new Number(count);
    return num.toFixed(2);
  }
  set titulo(value: string) {
    this._titulo = value;
  }
  get titulo(): string {
    return this._titulo;
  }
  set muestraTexto(value: boolean) {
    this._muestraTexto = value;
  }
  get muestraTexto(): boolean {
    return this._muestraTexto;
  }
  set pasarela(value: Pasarela) {
    this._pasarela = value;
  }
  get pasarela(): Pasarela {
    return this._pasarela;
  }
  set caja(value: Caja) {
    this._caja = value;
  }
  get caja(): Caja {
    return this._caja;
  }

  get today(): string {
    const fecha = (new Date());
    const mes = (fecha.getMonth() + 1) <= 9 ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1);
    const dia = fecha.getDate() <= 9 ? '0' + (fecha.getDate() + 1) : fecha.getDate();
    const year = fecha.getFullYear() <= 9 ? '0' + fecha.getFullYear() : fecha.getFullYear();
    const date = year + '-' + mes + '-' + dia;
    return date + '';
  }

  get fechaMax(): string {
    const fecha = this.modelFinal;
    const mes = (fecha.month) <= 9 ? '0' + (fecha.month) : (fecha.month);
    const dia = fecha.day <= 9 ? '0' + (fecha.day + 1) : fecha.day + 1;
    const year = fecha.year <= 9 ? '0' + fecha.year : fecha.year;
    const date = year + '-' + mes + '-' + dia;
    return date + '';
  }

  get fechaMin(): string {
    const fecha = this.modelInicial;
    const mes = (fecha.month) <= 9 ? '0' + (fecha.month) : (fecha.month);
    const dia = fecha.day <= 9 ? '0' + (fecha.day) : fecha.day;
    const year = fecha.year <= 9 ? '0' + fecha.year : fecha.year;
    const date = year + '-' + mes + '-' + dia;
    return date + '';
  }

}
