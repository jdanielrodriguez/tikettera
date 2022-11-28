import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Inventario, ListaBusqueda, Menus, Proveedor } from '../../interfaces';
@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {
  private _proveedorEvent: EventEmitter<ListaBusqueda> = new EventEmitter<ListaBusqueda>();
  constructor(
    private router: Router,
    private localSt: LocalStorageService,
  ) { }
  private _lista: ListaBusqueda[] = [];
  private _page = 1;
  private _size = 100;
  private _numReg = 50;
  private _tieneDetalle = false;
  private _editar!: boolean;
  private _eliminarCarrito = false;
  private _agregaCarrito = false;
  private _categorias = false;
  private _adminProv = false;
  private _esAdmin = false;
  private _autorizaNav = true;
  private _pagar = false;
  private _proveedor = '';
  private _paginaActual: EventEmitter<number> = new EventEmitter<number>();
  ngOnInit(): void {
  }

  public saveConfirm(data: Menus, id?: number): void {
    this._autorizaNav = true;
    if (this._autorizaNav) {
      this.router.navigate([data.url]);
    }
  }

  public handleRefusal(dismissMethod?: string): void {
    this._autorizaNav = true;
  }
  agregarCarrito(producto: Inventario) {
  }
  removerCarrito(data: Inventario) {
  }
  navegar(data: Menus, id?: number, info?: ListaBusqueda) {
    if (data.evento) {
      eval.call(data.evento, '');
    }
    if (info && this.resetCarrito(info)) {
      this._autorizaNav = false;
    } else
      if (this._autorizaNav) {
        this.router.navigate([data.url]);
      }
    if (id && id > 0) {
      this.localSt.store('currentSelectedId', btoa(id + ''));
    }
  }
  resetCarrito(value?: ListaBusqueda): boolean {
    let ret = false;
    if (!this.agregaCarrito && !this.eliminarCarrito && !this.esAdmin) {
    }
    return ret;
  }
  cambioPagina(value: any) {
    this._page = value;
    this._paginaActual.emit(this.page);
  }
  autorizarProveedor(value?: ListaBusqueda) {
  }
  getPrecio(data: ListaBusqueda): string {
    let total = 0.0;
    const num = new Number(total);
    return num.toFixed(2);
  }
  getTotal(data: ListaBusqueda): string {
    let total = 0.0;
    const num = new Number(total);
    return num.toFixed(2);
  }

  @Input()
  set page(value: number) {
    this._page = value;
  }
  get page(): number {
    return this._page;
  }
  @Input()
  set numReg(value: number) {
    this._numReg = value;
  }
  get numReg(): number {
    return this._numReg;
  }
  @Input()
  set size(value: number) {
    this._size = value;
  }
  get size(): number {
    return this._size;
  }
  @Input()
  set proveedor(value: string) {
    this._proveedor = value;
  }
  get proveedor(): string {
    return this._proveedor;
  }
  @Input()
  set esAdmin(value: boolean) {
    this._esAdmin = value === true;
  }
  get esAdmin(): boolean {
    return this._esAdmin;
  }
  @Input()
  set pagar(value: boolean) {
    this._pagar = value === true;
  }
  get pagar(): boolean {
    return this._pagar;
  }
  @Input()
  set categorias(value: boolean) {
    this._categorias = value === true;
  }
  get categorias(): boolean {
    return this._categorias;
  }
  @Input()
  set tieneDetalle(value: boolean) {
    this._tieneDetalle = value === true;
  }
  get tieneDetalle(): boolean {
    return this._tieneDetalle;
  }
  @Input()
  set agregaCarrito(value: boolean) {
    this._agregaCarrito = value === true;
  }
  get agregaCarrito(): boolean {
    return this._agregaCarrito;
  }
  @Input()
  set eliminarCarrito(value: boolean) {
    this._eliminarCarrito = value === true;
  }
  get eliminarCarrito(): boolean {
    return this._eliminarCarrito;
  }
  @Input()
  set adminProv(value: boolean) {
    this._adminProv = value === true;
  }
  get adminProv(): boolean {
    return this._adminProv;
  }
  @Input()
  set lista(value: ListaBusqueda[]) {
    this._lista = value;
  }
  get lista(): ListaBusqueda[] {
    return this._lista;
  }
  @Output()
  get paginaActual(): EventEmitter<number> {
    this._paginaActual.emit(this.page);
    return this._paginaActual;
  }
  @Output()
  get proveedorAut(): EventEmitter<ListaBusqueda> {
    return this._proveedorEvent;
  }
  get proveedorAutStr(): ListaBusqueda {
    return new ListaBusqueda();
  }
  @Input()
  set editar(value: boolean) {
    this._editar = value;
  }

  get editar(): boolean {
    return this._editar;
  }
}
