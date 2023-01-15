import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit, AfterViewInit {
  model!: NgbDateStruct
  date!: { year: number, month: number, day: number };
  // private _proveedor: EventEmitter<Proveedor> = new EventEmitter<Proveedor>();
  constructor(private calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.iniciarFecha()
  }

  ngAfterViewInit() {
  }
  iniciarFecha() {
    // if (this._data) {
      this.date = {
        day: (new Date().getDate()),
        year: (new Date().getFullYear()),
        month: (new Date().getMonth() + 1)
      };//(this._data.nacimiento && this._data.nacimiento.length > 9) ? JSON.parse(this._data.nacimiento) : this._data.nacimiento;
      if (this.date) {
        if (!this.date.year) {
          this.date.year = new Date().getFullYear()
        }
      }
      if (this.date) {
        this.model = {
          day: this.date.day ? this.date.day : new Date().getDate(),
          year: this.date.year ? this.date.year : new Date().getFullYear(),
          month: this.date.month ? this.date.month : (new Date().getMonth() + 1)
        };
      } else {
        this.model = {
          day: (new Date().getDate()),
          year: (new Date().getFullYear()),
          month: (new Date().getMonth() + 1)
        };
      }
    // }
    // else {
      this.model = {
        day: (new Date().getDate()),
        year: (new Date().getFullYear()),
        month: (new Date().getMonth() + 1)
      };
    // }
  }
  cargar(form: any) {
    // let aux = {
    //   nombre: this._data.nombre,
    //   apellido: this._data.apellido
    // }
    // this._data = form.value
    // if (!this._data.nombre || !this._data.apellido) {
    //   this._data.apellido = aux.apellido
    //   this._data.nombre = aux.nombre
    // }
    // this._data.nacimiento = JSON.stringify(this.model)
    // this._proveedor.emit(this._data);
  }
  selectToday() {
    this.model = this.calendar.getToday();
  }

  get year(): number {
    return (new Date().getFullYear())
  }
}
