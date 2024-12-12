import { Component, AfterViewInit, HostListener, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { Menus, Perfil, Configuracion } from './../../interfaces';
import { Sesion } from './../../common/sesion';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
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
  private _logo = 'assets/images/logo.png';
  constructor(
    private router: Router,
    private mySesion: Sesion,
    private cdref: ChangeDetectorRef,
    private localSt: LocalStorageService
  ) { }
  public isMenuCollapsed = true;
  public isFullScreeen = window.screen.width > 500;
  public defaultProfilePicture = 'https://robohash.org/68.186.255.198.png';

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
  navegar(data: Menus, id?: number, evento?: MouseEvent, inicio?: boolean): void {
    if (data.evento) {
      eval.call(data.evento, '');
    }
    if (evento) {
      evento.stopPropagation();
    }

    this.router.navigate([data.url]).then((success) => {
      if (success) {
        this.isMenuCollapsed = true;
      }
    });

    if (id && id > 0) {
      this.localSt.store('currentSelectedId', btoa(id.toString()));
    }
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.detectScreen();
  }

  ngAfterViewInit(): void {
    this.detectScreen();
    this.validarSesion();
  }

  ngAfterContentChecked() {
    this.cargarConfig();
    if (this._logo && this._logo.length <= 0) {
      this._logo = 'assets/images/logo.png';
    }
    this.cdref.detectChanges();
  }

  detectScreen(): void {
    this.isFullScreeen = window.innerWidth > 500;
  }

  iniciarMenus(): void {
    this._menus = [
      {
        sesion: false,
        select: false,
        url: '../',
        inicio: true,
        evento: null,
        nombre: 'Inicio'
      },
      {
        sesion: true,
        select: false,
        url: '../',
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
        url: '../event-create',
        evento: null,
        nombre: 'Crea tu evento'
      },
      {
        sesion: true,
        select: false,
        url: '../event-create',
        evento: null,
        clienteOnly: true,
        rol: 2,
        nombre: 'Crea tu evento'
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
            url: '../dashboard/events',
            evento: null,
            nombre: 'Mis Eventos'
          }, {
            sesion: true,
            select: false,
            url: '../dashboard/produced-events',
            evento: null,
            rol: 2,
            nombre: 'Mis Eventos Producidos'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/information',
            evento: null,
            nombre: 'Mi Informacion'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/credit-cards',
            evento: null,
            nombre: 'Mis Tarjetas'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/orders',
            evento: null,
            nombre: 'Mis Ordenes'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/bills',
            evento: null,
            nombre: 'Mis Registros'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/categorias',
            clienteOnly: true,
            rol: 2,
            evento: null,
            nombre: 'Mis Categorias'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/inventario',
            evento: null,
            rol: 2,
            nombre: 'Mi Inventario'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/settings',
            evento: null,
            nombre: 'Configuracion'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/autorizar-productores',
            evento: null,
            rol: 1,
            nombre: 'Autorizar productores'
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

  shouldDisplayMenu(data: Menus): boolean {
    return data.sesion === this.sesion && (!data.rol || data.rol === this.rol);
  }

  canAccessSubmenu(sub: Menus): boolean {
    return !(sub.rol && this.rol > sub.rol);
  }

  handleMenuClick(data: Menus): void {
    this.navegar(data);
    this.toggleMenuState();
  }

  toggleMenuState(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
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
  get currentPerfil(): string {
    return '';//this.mySesion.perfil.nombre;
  }
  get rol(): number {
    let ret = 0;
    this.mySesion.actualizaPerfil();
    const perfil: Perfil = this.mySesion.perfil ? this.mySesion.perfil : (new Perfil());
    if (perfil.rol_id) {
      ret = perfil.rol_id ? perfil.rol_id : 0;
    }
    return ret;
  }
}
