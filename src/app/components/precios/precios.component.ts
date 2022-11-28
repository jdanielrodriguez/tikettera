import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Inventario, Menus, Producto } from 'src/app/interfaces';
import { Sesion } from '../../metodos';
@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: [],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class PreciosComponent implements OnInit {

  constructor(
    private mySesion: Sesion,
    private _service: NotificationsService,
  ) { }
  @Input()
  set producto(value: Inventario) {
    this._producto = value;
  }
  get producto(): Inventario {
    return this._producto;
  }
  get today() {
    return new Date();
  }
  @Output()
  get guardar(): EventEmitter<Inventario> {
    this._inventario.emit(this._producto);
    return this._inventario;
  }
  private _inventario: EventEmitter<Inventario> = new EventEmitter<Inventario>();
  private _producto: Inventario = new Inventario();
  @BlockUI() blockUI!: NgBlockUI;
  positions: any;
  public active = 1;
  public options = {
    position: ['bottom', 'right'],
    timeOut: 2000,
    lastOnBottom: false,
    animate: 'scale',
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };
  ngOnInit() {
  }
  navegar(data: Menus, id?: number) {
    this.mySesion.navegar(data, id);
  }
  update(form: any) {
    this._producto.nombre = form.value.nombre;
    this._producto.descripcion = form.value.descripcion;
    this._inventario.emit(this._producto);
  }
  muestraProducto(value?: number) {
    this.active = value ? value : 1;
    const pre = this.producto.precio;
    this.producto.precio = 0;
    setTimeout(() => {
      this.producto.precio = pre;
    }, 100);
  }
  obtenerLista(value: Producto[]) {
    this._producto.productos = value;
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }
  createError(error: string) {
    this._service.error('¡Error!', error);
  }

}
