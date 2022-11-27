import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2'
import { FormasPagoService } from "./../../services/formas-pago.service";
import { Perfil, MetodoPago } from 'src/app/interfaces';
import { Sesion } from 'src/app/metodos';
@Component({
  selector: 'app-metodo-pago-form',
  templateUrl: './metodo-pago-form.component.html',
  styleUrls: ['./metodo-pago-form.component.css']
})
export class MetodoPagoFormComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  private _perfil: Perfil = new Perfil()
  today: any
  private _frente: boolean = false;
  private _isCollapsed: boolean = true;
  public expDate = {
    months: [],
    years: []
  }
  nacimientoToday: any
  private _listaEmit: EventEmitter<MetodoPago[]> = new EventEmitter<MetodoPago[]>();
  private _perfilEmit: EventEmitter<Perfil> = new EventEmitter<Perfil>();
  private _lista: MetodoPago[] = [];
  private _listaEliminar: MetodoPago[] = [];
  private _data: MetodoPago = new MetodoPago();
  constructor(
    private mainService: FormasPagoService,
    private encrypt: Sesion
  ) { }
  ngOnInit(): void {
    this.iniciarCombos();
    this._listaEliminar = [];
  }
  cargar() {
    this._listaEmit.emit(this.lista);
  }
  addNew() {
    this.isCollapsed = false
    this._data = new MetodoPago();
    this.iniciarCombos();
  }
  iniciarCombos() {
    this.expDate.months.length = 0
    for (let i = 1; i <= 12; i++) {
      // this.expDate.months.push(i < 10 ? '0' + i : '' + i)
    }
    this.expDate.years.length = 0
    const yearActual = new Date().getFullYear();
    for (let i = yearActual; i <= yearActual + 8; i++) {
      // this.expDate.years.push(i)
    }
    if (!this._data.exp_yearTC || this._data.exp_yearTC == '') {
      this._data.exp_yearTC = "2021"
      this._data.exp_montTC = "10"
    }
  }
  girarTarjeta(value?: boolean) {
    this.frente = (value != null) ? value : !this._frente
  }
  async guardar() {
    let dat = {
      formasPago: this.encrypt.encriptar(JSON.stringify(this.lista)),
      aEliminar: this.encrypt.encriptar(JSON.stringify(this._listaEliminar)),
      usuario: this.encrypt.encriptar(JSON.stringify(this.perfil))
    }
    this.blockUI.start();
    await this.mainService.create(dat)
      .then((element: { status: number, objeto: MetodoPago[] }) => {
        this._perfil.formas_pago = element.objeto
        this._perfilEmit.emit(this._perfil);
        this._listaEliminar = [];
        this._isCollapsed = true
        this.blockUI.stop();
      })
      .catch(error => {
        this.blockUI.stop();
        if (error.indexOf('401') >= 0) {
          alert("Su sesion ha vencido");
          this.encrypt.navegar({ url: '../../../../../logout' })
        }
        console.log(error);
      })
  }
  marcarDefault(data: MetodoPago, evento?: MouseEvent) {
    if (evento) {
      evento.stopPropagation();
    }
    // this._perfil.formas_pago.forEach((element: MetodoPago) => {
    //   if (element.id == data.id) {
    //     element.default = element.default == 1 ? 0 : 1
    //   } else {
    //     element.default = 0
    //   }
    // })
    this._perfilEmit.emit(this._perfil);
  }
  seleccionar(data: MetodoPago, evento?: MouseEvent) {
    if (evento) {
      evento.stopPropagation();
    }
    // data.exp_dateTC = this.encrypt.desencriptar(data.exp_dateTC)
    // data.exp_yearTC = data.exp_yearTC ? this.encrypt.desencriptar(data.exp_yearTC) : '2021';
    // data.exp_montTC = data.exp_montTC ? this.encrypt.desencriptar(data.exp_montTC) : '10';
    // data.numeroTC = this.encrypt.desencriptar(data.numeroTC)
    // data.cvvTC = this.encrypt.desencriptar(data.cvvTC)
    this._data = data
    this._isCollapsed = false
  }
  agregar(form: any) {
    form.value.nombre = "XXXX XXXX XXXX " + (form.value.numeroTC.substr(15))
    form.value.exp_dateTC = this.encrypt.encriptar(form.value.exp_montTC + '/' + form.value.exp_yearTC)
    form.value.exp_yearTC = this.encrypt.encriptar(form.value.exp_yearTC)
    form.value.exp_montTC = this.encrypt.encriptar(form.value.exp_montTC)
    form.value.numeroTC = this.encrypt.encriptar(form.value.numeroTC)
    form.value.cvvTC = this.encrypt.encriptar(form.value.cvvTC)
    if (form.value.id) {
      let index = this._lista.findIndex((element: MetodoPago) => {
        return element.id == form.value.id
      })
      if (index >= 0) {
        // this._perfil.formas_pago[index] = form.value
      }
    } else {
      if (this._perfil.formas_pago) {
        this._perfil.formas_pago.push(form.value)
      } else {
        this._perfil.formas_pago = []
        this._perfil.formas_pago.push(form.value)
      }
    }
    // this._lista = this._perfil.formas_pago
    this._perfilEmit.emit(this._perfil);
    this._listaEmit.emit(this._lista);
    this._isCollapsed = true
    this.guardar()
  }
  desencripta(value: any): string {
    let dat = this.encrypt.desencriptar(value)
    return dat ? dat : ''
  }
  eliminarMetodo(form: MetodoPago) {
    Swal.fire({
      title: 'Cuidado',
      text: 'Se eliminara la Direccion seleccionada',
      icon: 'warning',
      confirmButtonText: 'Esta bien, Eliminar'
    }).then((result) => {
      if (result.value) {
        let index = this._lista.findIndex((element: MetodoPago) => {
          return element.id == form.id
        })
        // this._perfil.formas_pago.splice(index, 1)
        this._perfilEmit.emit(this.perfil);
        this._listaEliminar.push(form)
      }
    })
  }
  @Output()
  get form(): EventEmitter<MetodoPago[]> {
    this._listaEmit.emit(this.lista);
    return this._listaEmit;
  }
  @Output()
  get obtenerPerfil(): EventEmitter<Perfil> {
    this._perfilEmit.emit(this.perfil);
    return this._perfilEmit;
  }
  get lista(): MetodoPago[] {
    return this._lista;
  }
  @Input()
  set perfil(value: Perfil) {
    this._perfil = value;
    if (this._perfil.formas_pago && this._perfil.formas_pago.length > 0) {
      this._lista = this._perfil.formas_pago
    }
  }
  get perfil(): Perfil {
    return this._perfil;
  }
  get data(): MetodoPago {
    return this._data;
  }
  set data(value: MetodoPago) {
    this._data = value;
  }

  set isCollapsed(value: boolean) {
    this._isCollapsed = value
  }
  get isCollapsed(): boolean {
    return this._isCollapsed
  }
  set frente(value: boolean) {
    this._frente = value
  }
  get frente(): boolean {
    return this._frente
  }
}
