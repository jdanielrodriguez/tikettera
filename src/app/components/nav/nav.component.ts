import { Component, AfterViewInit, HostListener, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { Menus, Perfil, Carrito, Configuracion } from './../../interfaces';
import { Sesion } from './../../metodos';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, AfterViewInit {
  private _menus!: Menus[];
  private _proveedores!: string;
  private _proveedor!: string;
  private _color!: string;
  private _background!: string;
  private _configuracion!: Configuracion;
  private _sesion!: boolean;
  private _esAdmin!: boolean;
  private _perfil!: Perfil;
  private _carrito!: Carrito[];
  private _logo = 'assets/images/logo.png';
  constructor(
    private router: Router,
    private mySesion: Sesion,
    private cdref: ChangeDetectorRef,
    private localSt: LocalStorageService
  ) { }
  public isMenuCollapsed = true;
  public isFullScreeen = window.screen.width > 500;
  ngOnInit(): void {
    this.iniciarMenus();
    this.validarSesion();
  }
  validarSesion() {
    this.mySesion.actualizaPerfil();
  }
  cargarConfig() {
    if (!this.esAdmin) {
      // if (this.myProveedor.provs) {
      //   if (this.myProveedor.provs.configuraciones && this.myProveedor.provs.configuraciones.length > 0) {
      //     const index = this.myProveedor.provs.configuraciones.findIndex((element: Configuracion) => {
      //       return element.tipo === 1;
      //     });
      //     if (index >= 0) {
      //       this._configuracion = this.myProveedor.provs.configuraciones[index];
      //       this._color = this._configuracion.css;
      //       this._proveedores = this._configuracion.footer;
      //       this._background = this._configuracion.color_nav;
      //       if (this._configuracion.imagenes.length > 0) {
      //         this._logo = this._configuracion.imagenes[0].url;
      //       } else {
      //         this._logo = 'assets/images/logo.png';
      //       }
      //     }
      //   } else {
      //     this._color = null;
      //     this._background = null;
      //     this._proveedores = null;
      //     this._logo = 'assets/images/logo.png';
      //   }
      // }
    }
  }
  navegar(data: Menus, id?: number, evento?: MouseEvent, inicio?: boolean) {
    if (data.evento) {
      eval.call(data.evento, '');
    }
    if (evento) {
      evento.stopPropagation();
    }
    if (inicio) {
      // this.myProveedor.actualizar();
      const urls = data.url.split('/');
      // this._proveedor = this.myProveedor.provs ? this.myProveedor.provs.nombre : '';
      // data.url = urls[0] + '/' + this.proveedor + 'inicio';
    }
    this.router.navigate([data.url]);
    if (id && id > 0) {
      this.localSt.store('currentSelectedId', btoa(id + ''));
    }
  }
  @HostListener('window:resize', [])
  private onResize() {
    this.detectScreen();
  }
  ngAfterViewInit() {
    this._sesion = this.mySesion.validarSesion();
    this.detectScreen();
    // this.myProveedor.actualizar();
    this.validarSesion();
    this.mySesion.actualizaPerfil();
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentChecked() {
    this.cargarConfig();
    if (this._logo && this._logo.length <= 0) {
      this._logo = 'assets/images/logo.png';
    }
    this.cdref.detectChanges();
  }
  private detectScreen() {
    this.isFullScreeen = window.screen.width > 500;
  }
  iniciarMenus(): void {
    this._menus = [
      {
        sesion: false,
        select: false,
        url: '../inicio',
        inicio: true,
        evento: null,
        nombre: 'Inicio'
      },
      {
        sesion: true,
        select: false,
        url: '../inicio',
        inicio: true,
        evento: null,
        nombre: 'Inicio'
      },
      {
        sesion: false,
        select: false,
        url: '../login',
        evento: null,
        nombre: 'Ingresar'
      },
      {
        sesion: false,
        select: false,
        url: '../register',
        evento: null,
        nombre: 'Registrarse'
      },
      {
        sesion: false,
        select: false,
        url: '../../nosotros',
        inicio: false,
        evento: null,
        nombre: 'Nosotros'
      },
      {
        sesion: true,
        select: false,
        url: '../../nosotros',
        inicio: false,
        evento: null,
        nombre: 'Nosotros'
      },
      {
        sesion: false,
        select: false,
        url: '../vender',
        evento: null,
        nombre: 'Vender'
      },
      {
        sesion: true,
        select: false,
        url: '../vender',
        evento: null,
        clienteOnly: true,
        rol: 2,
        nombre: 'Vender'
      },
      {
        sesion: true,
        select: false,
        url: '../dashboard',
        evento: null,
        nombre: 'Dashboard',
        submenu: [
          {
            sesion: true,
            select: false,
            url: '../dashboard/perfil',
            evento: null,
            nombre: 'Perfil'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/categorias',
            evento: null,
            rol: 4,
            nombre: 'Categorias'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/inventario',
            evento: null,
            rol: 4,
            nombre: 'Inventario'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/ordenes',
            evento: null,
            rol: 2,
            nombre: 'Ordenes'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/caja',
            evento: null,
            rol: 2,
            nombre: 'Caja'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/autorizar-proveedores',
            evento: null,
            rol: 5,
            nombre: 'Autorizar Proveedores'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/configuracion',
            evento: null,
            nombre: 'Configuraciones'
          },
          {
            sesion: true,
            select: false,
            url: '../logout',
            nombre: 'Salir'
          }
        ]
      }
    ];
  }
  @Input()
  set menus(values: Menus[]) {
    this._menus = values;
  }
  get menus(): Menus[] {
    return this._menus;
  }
  @Input()
  set logo(values: string) {
    this._logo = values;
  }
  get logo(): string {
    return this._logo;
  }
  set perfil(values: Perfil) {
    this._perfil = values;
  }
  get perfil(): Perfil {
    this._perfil = this.mySesion.perfil;
    return this._perfil;
  }
  set sesion(value: boolean) {
    this._sesion = value;
  }
  get sesion(): boolean {
    this._sesion = this.mySesion.validarSesion();
    return this._sesion;
  }
  @Input()
  set esAdmin(value: boolean) {
    this._esAdmin = value;
  }
  get esAdmin(): boolean {
    return this._esAdmin;
  }
  @Input()
  set proveedores(value: string) {
    this._proveedores = value;
  }
  get proveedores(): string {
    return this._proveedores;
  }
  set proveedor(value: string) {
    this._proveedor = value;
  }
  get proveedor(): string {
    // this._proveedor = this.myProveedor.provs?.nombre;
    return this._proveedor + (this._proveedor.length > 0 ? '/' : '');
  }
  @Input()
  set color(value: string) {
    this._color = value;
  }
  get color(): string {
    return this._color;
  }
  @Input()
  set background(value: string) {
    this._background = value;
  }
  get background(): string {
    return this._background;
  }
  getColor(): any {
    this.cargarConfig();
    if (this._color) {
      return { color: this._color };
    }
  }
  getBackground(): any {
    this.cargarConfig();
    if (this._background) {
      return { 'background-color': this._background };
    }
  }
  set carrito(value: Carrito[]) {
    this._carrito = value;
  }
  get carrito(): Carrito[] {
    // this._carrito = this.myCarrito.carros;
    return this._carrito;
  }
  get currentPerfil(): string {
    return '';//this.mySesion.perfil.nombre;
  }
  get rol(): number {
    let ret = 0;
    this.mySesion.actualizaPerfil();
    const perfil: Perfil = this.mySesion.perfil ? this.mySesion.perfil : (new Perfil());
    if (perfil.rol) {
      ret = perfil.rol.id ? perfil.rol.id : 0;
    }
    return ret;
  }
  get actualizarPass(): boolean {
    return this.perfil.estado === 21;
  }
}
