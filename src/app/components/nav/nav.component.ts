import { Component, AfterViewInit, HostListener, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { Menus, Perfil, Configuracion } from './../../interfaces';
import { Sesion } from './../../common/sesion';
import { Constantes } from './../../common/constant';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {
  proveedor!: string;
  _sesion!: boolean;
  _perfil!: Perfil;
  @Input() menus!: Menus[];
  @Input() proveedores!: string;
  @Input() color!: string;
  @Input() background!: string;
  @Input() configuracion!: Configuracion;
  @Input() esAdmin!: boolean;
  @Input() logo = 'assets/images/logo.png';
  constructor(
    private router: Router,
    private mySesion: Sesion,
    private constantes: Constantes,
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
      //       this.color = this._configuracion.css;
      //       this._proveedores = this._configuracion.footer;
      //       this.background = this._configuracion.color_nav;
      //       if (this._configuracion.imagenes.length > 0) {
      //         this._logo = this._configuracion.imagenes[0].url;
      //       } else {
      //         this._logo = 'assets/images/logo.png';
      //       }
      //     }
      //   } else {
      //     this.color = null;
      //     this.background = null;
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
    if (this.logo && this.logo.length <= 0) {
      this.logo = 'assets/images/logo.png';
    }
    this.cdref.detectChanges();
  }

  detectScreen(): void {
    this.isFullScreeen = window.innerWidth > 500;
  }

  iniciarMenus(): void {
    this.menus = [
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
        rol: this.constantes.roles.promoter,
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
            url: '../dashboard/information',
            evento: null,
            nombre: 'Mi Informacion'
          }, {
            sesion: true,
            select: false,
            url: '../dashboard/produced-events',
            evento: null,
            rol: this.constantes.roles.promoter,
            nombre: 'Mis Eventos Producidos'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/entries',
            evento: null,
            nombre: 'Mis Entradas'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/payment-methods',
            evento: null,
            rol: this.constantes.roles.promoter,
            nombre: 'Mis Tarjetas'
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
            url: '../dashboard/settings',
            evento: null,
            nombre: 'Configuracion'
          },
          {
            sesion: true,
            select: false,
            url: '../dashboard/autorizar-promotores',
            evento: null,
            rol: this.constantes.roles.admin,
            nombre: 'Autorizar Promotores'
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
  getColor(): any {
    this.cargarConfig();
    if (this.color) {
      return { color: this.color };
    }
  }
  getBackground(): any {
    this.cargarConfig();
    if (this.background) {
      return { 'background-color': this.background };
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
