import { Component, OnInit, Input } from '@angular/core';
import { HistoricoCaja, Caja, Factura } from '../../../../../../interfaces';
@Component({
  selector: 'app-historial-view',
  templateUrl: './view.component.html',
  styleUrls: []
})
export class ViewHistorialComponent implements OnInit {
  private _historico: HistoricoCaja[] = [];
  private _facturas: Factura[] = [];
  constructor() { }
  ngOnInit(): void {
  }
  @Input()
  set historico(value: HistoricoCaja[]) {
    this._historico = value;
  }
  get historico(): HistoricoCaja[] {
    return this._historico;
  }
  @Input()
  set facturas(value: Factura[]) {
    this._facturas = value;
  }
  get facturas(): Factura[] {
    return this._facturas;
  }
  parseDecimal(value: number): string {
    const num = new Number(value);
    return num.toFixed(2);
  }
  get impuestoHistorico(): string {
    let count = 0;
    this.historico.forEach(element => {
      if (element.impuesto) {
        count = count + (element.total ? element.total : 0);
      }
    });
    const num = new Number(count);
    return num.toFixed(2);
  }

}
