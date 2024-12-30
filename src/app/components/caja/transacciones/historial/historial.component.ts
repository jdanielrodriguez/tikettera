import { Component, OnInit, Input } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { HistoricoCaja, Perfil } from '../../../../interfaces';

@Component({
  selector: 'app-caja-historial',
  templateUrl: './historial.component.html',
  styleUrls: []
})
export class HistorialComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  private _historico!: HistoricoCaja[];
  private _perfil: Perfil = new Perfil();
  _modelFinal!: NgbDateStruct;
  _modelInicial!: NgbDateStruct;
  date!: { year: number, month: number, day: number };
  dateMin: { year: number, month: number, day: number } = {
    year: 2015,
    month: 1,
    day: 1
  };
  dateInicial!: string;
  dateFinal!: string;
  constructor(
  ) { }
  public active = 1;
  ngOnInit(): void {
    this.cargarHistoricoTransacciones();
  }
  cargarHistoricoTransacciones() {
    const data = {
      id: this.perfil ? this.perfil.id : 0,
      estado: 0,
      filter: 'historial&fechaInicial=' + this.fechaMin + '&fechaFinal=' + this.fechaMax
    };
    // this.comisionesService.getTransaccionesFilter(data)
    //   .then((response: { status: number, detalle: HistoricoCaja[] }) => {
    //     this.historico = response.detalle;
    //   })
    //   .catch(error => {
    //   });
  }
  @Input()
  set modelFinal(value: NgbDateStruct) {
    this._modelFinal = value;
  }
  get modelFinal(): NgbDateStruct {
    return this._modelFinal;
  }
  @Input()
  set modelInicial(value: NgbDateStruct) {
    this._modelInicial = value;
  }
  get modelInicial(): NgbDateStruct {
    return this._modelInicial;
  }
  @Input()
  set perfil(value: Perfil) {
    this._perfil = value;
  }
  get perfil(): Perfil {
    return this._perfil;
  }
  set historico(value: HistoricoCaja[]) {
    this._historico = value;
  }
  get historico(): HistoricoCaja[] {
    return this._historico;
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
