import { Component, OnInit, Input, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UsuariosService } from "./../../services/usuarios.service";
import { AuthServices } from "./../../services/auth.service";
import { Menus, Socialusers, Perfil, Imagen } from "./../../interfaces";
import { Modal } from "./../modal.component";
import { Sesion } from "./../../metodos";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any
@Component({
  selector: 'app-register-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  today: any
  nacimientoToday: any
  @ViewChild(Modal) registerModal!: Modal
  @BlockUI() blockUI!: NgBlockUI;
  private _component: EventEmitter<string> = new EventEmitter<string>();
  private _componentStr!: string
  private _esModal!: boolean;
  private _userAcepted: boolean = false;
  private _tipo!: boolean;
  private _muestraTexto!: boolean;
  private _perfil!: Perfil;
  private _titulo: string = "";
  private _dinamicLink: string = "";
  @Input()
  set esModal(value: boolean) {
    this._esModal = value
  }
  get esModal(): boolean {
    return this._esModal;
  }
  @Input()
  set muestraTexto(value: boolean) {
    this._muestraTexto = value
  }
  get muestraTexto(): boolean {
    return this._muestraTexto;
  }
  set userAcepted(value: boolean) {
    this._userAcepted = value
  }
  get userAcepted(): boolean {
    return this._userAcepted;
  }
  @Input()
  set titulo(value: string) {
    this._titulo = value
  }
  get titulo(): string {
    return this._titulo;
  }
  @Input()
  set dinamicLink(value: string) {
    if (value) {
      this.mySesion.lastLink = value
    }
    this._dinamicLink = value
  }
  @Output()
  get component(): EventEmitter<string> {
    this._component.emit(this._componentStr);
    return this._component;
  }
  get componentStr(): string {
    return this._componentStr;
  }
  @Input()
  set esProv(value: boolean) {
    this._tipo = value
  }
  get esProveedor(): boolean {
    return this._tipo
  }
  get esCliente(): boolean {
    return this._tipo != true
  }
  set perfil(value: Perfil) {
    this._perfil = value
  }
  get perfil(): Perfil {
    if (this.mySesion.validarSesion()) {
      this._perfil = this.mySesion.perfil
      this.userAcepted = true
      $("#email").val(this._perfil.email);
      $("#password").val("***********");
      $("#password_rep").val("**********");
    }
    return this._perfil;
  }
  get mostrarNotificacion(): boolean {
    if (this.perfil) {
      // if (this.perfil.password && this.perfil.password.length >= 1 && (this.perfil.password_rep.length >= 1)) {
      //   return true;
      // }
    }
    return false
  }
  get contraValida(): boolean {
    if (this.perfil) {
      if (this.perfil.password && this.perfil.password.length >= 1 && (this.perfil.password == this.perfil.password_rep)) {
        return true;
      }
    }
    return false
  }
  get contraMinima(): boolean {
    // if (this.perfil.password.length >= 3 && (this.perfil.password != this.perfil.password_rep)) {
    //   return false;
    // }
    return true
  }
  constructor(
    private router: Router,
    public userServices: UsuariosService,
    private modalService: NgbModal,
    private authServices: AuthServices,
    private config: NgbModalConfig,
    private mySesion: Sesion,
  ) {
    config.backdrop = 'static';
    config.keyboard = true;
    config.size = 'lg'
  }
  ngOnInit() {
    $('html, body').animate({ scrollTop: 0 }, '300');
    if (this.esModal) {
      let temp = Modal
      if (this.titulo) {
        if (this.registerModal) {
          this.registerModal.titulo = this.titulo;
        }
      }
      temp.prototype.titulo = this.titulo
      this.modalService.open(temp);
    }
    setTimeout(() => {
      $(".grecaptcha-badge").removeClass("visible");
      $(".grecaptcha-badge").addClass("visible");
    }, 1000);
  }
  async aceptarUsuario(value: boolean, form?: any) {
    let token = await this.mySesion.validateCaptcha('register');
    let Fresponse: { status: number, objeto: any }
    if (token) {
      let dat = {
        token: btoa(token)
      }
      this.blockUI.start();
      await this.authServices.validarCaptcha(dat)
        .then((response: { status: number, objeto: any }) => {
          Fresponse = response
          this.blockUI.stop();
          if (Fresponse && Fresponse.objeto.success) {
            this.blockUI.start();
            if (!value) {
              this.blockUI.stop();
              this.userAcepted = value
              if (form) {
                this.mySesion.createError("Compruebe que sus contraseñas sean iguales")
              }
              return;
            }
            // if (this.perfil.email.length >= 5 && this.validarEmail(this.perfil.email)) {
            //   if (this.perfil.password.length <= 3 || this.perfil.password.length <= 3 || (this.perfil.password != this.perfil.password_rep)) {
            //     this.mySesion.createError("Compruebe que sus contraseñas esten ingresadas correctamente")
            //   } else {
            //     this.userAcepted = (value && (this.perfil ? true : false))
            //   }
            // } else {
            //   this.mySesion.createError("Su email no es valido")
            // }
            this.blockUI.stop();
          }
        }).catch(error => {
          console.log(error);
        })
    } else {
      token = await this.mySesion.validateCaptcha('register');
      this.aceptarUsuario(value, form);
    }

  }
  cancelar(value: boolean) {
    if (!value) {
      this.blockUI.stop();
      this.userAcepted = value
      this.perfil.email = ""
      this.perfil.password = ""
      this.perfil.password_rep = ""
      $("#email").val("d");
      $("#password").val("d");
      $("#password_rep").val("d");
      $("#email").val("");
      $("#password").val("");
      $("#password_rep").val("");
      $("#email").focus();
    }
  }
  validarEmail(valor: string): boolean {
    return (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor))
  }

  public socialSignIn(socialProvider: string) {
    // this.blockUI.start();
    // let socialPlatformProvider;
    // if (socialProvider === 'facebook') {
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // } else if (socialProvider === 'google') {
    //   socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    // }
    // this.OAuth.signIn(socialPlatformProvider).then((socialusers: Socialusers) => {
    //   let perfil = new Perfil();
    //   let cliente = new Cliente();
    //   perfil.codigo = socialusers.id
    //   perfil.password = btoa(socialusers.id)
    //   perfil.google = socialProvider
    //   perfil.idToken = socialusers.idToken ? socialusers.idToken : ''
    //   perfil.nombre = socialusers.name
    //   cliente.nombre = socialusers.firstName
    //   cliente.apellido = socialusers.lastName
    //   if (socialProvider === 'facebook') {
    //     perfil.google_id = socialusers.id
    //     perfil.facebook_id = socialusers.id
    //     perfil.google_token = socialusers.authToken
    //   } else if (socialProvider === 'google') {
    //     perfil.google_id = socialusers.id
    //     perfil.google_token = socialusers.authToken
    //     perfil.idToken = socialusers.authToken
    //   }
    //   perfil.google_idToken = socialusers.idToken ? socialusers.idToken : ''
    //   perfil.email = socialusers.email
    //   perfil.username = socialusers.email.split('@')[0]
    //   perfil.picture = socialusers.photoUrl
    //   cliente.estado = 1
    //   perfil.estado = 1
    //   cliente.nombre_a_facturar = socialusers.name
    //   let img = new Imagen()
    //   img.url = socialusers.photoUrl
    //   perfil.imagenes = [img]
    //   this.perfil = perfil
    //   this.obtenerCliente(cliente)
    //   this.registrar(true)
    // }).catch(error => {
    //   this.blockUI.stop();
    //   console.log(error);
    // });
  }
  registrar(social: boolean = false) {
    if (!social) {
      this.blockUI.start();
    }
    this.perfil.picture = this.perfil.picture ? this.perfil.picture : 'https://robohash.org/68.186.255.198.png';
    // if (this.proveedor) {
    //   // this.proveedor.nombre = this.formatear.getCleanedString(this.proveedor.nombre)
    //   // this.proveedor.apellido = this.formatear.getCleanedString(this.proveedor.apellido)
    //   this._proveedor.nacimiento = this._proveedor.nacimiento ? btoa(this._proveedor.nacimiento) : btoa(new Date().toISOString())
    //   this.proveedor.estado = 3
    // }
    // if (this.cliente) {
      // this.cliente.nombre = this.formatear.getCleanedString(this.cliente.nombre)
      // this.cliente.apellido = this.formatear.getCleanedString(this.cliente.apellido)
      // this.cliente.nombre_a_facturar = this.formatear.getCleanedString(this.cliente.nombre_a_facturar)
    // }
    let data = {
      // cliente: this.perfil.clientes?.length > 0 ? null : (this.cliente ? this.mySesion.encriptar(JSON.stringify(this.cliente)) : null),
      // proveedor: this.proveedor ? this.mySesion.encriptar(JSON.stringify(this.proveedor)) : null,
      usuario: this.perfil ? this.mySesion.encriptar(JSON.stringify(this.perfil)) : null
    }
    this.userServices.create(data)
      .then((response: { status: number, objeto: Perfil, msg?: string }) => {
        if (response.status >= 400) {
          this.mySesion.createError(response.msg ? response.msg : '')
        } else {
          this.mySesion.actualizaPerfil(response.objeto);
          if (this.mySesion.validarSesion()) {
            $(".grecaptcha-badge").removeClass("visible");
            // if (this.modalService.hasOpenModals) {
            //   this.closeModal()
            // }
            if (this.mySesion.lastLink) {
              this.blockUI.stop();
              let linkURL = "./dashboard/inicio";
              if (this.mySesion.lastLink.length > 3) {
                let urls = this.mySesion.lastLink
                linkURL = urls
              }
              if (linkURL) {
                this.mySesion.lastLink = null
                this.router.navigate([`${linkURL}`])
              } else {
                this.router.navigate([`./dashboard/inicio`])
              }
            } else {
              this.router.navigate([`./dashboard/inicio`])
            }
          } else {
            this.mySesion.createError("Error iniciando sesion")
          }
        }
        this.blockUI.stop();
      }).catch((error) => {
        if (error.msg) {
          this.mySesion.createError(error.msg)
        } else {
          this.mySesion.createError("Error desconocido, por favor trate otra vez")
        }
        console.log(error);
        this.blockUI.stop();
      })
  }
  cargar(form: any) {
    let perfil: Perfil = new Perfil();
    perfil = form.value
    if (perfil) {
      // perfil.username = perfil.email.split("@")[0];
      perfil.state = 1;
      perfil.google_id = "";
      perfil.facebook_id = "";
      perfil.google_token = "";
      perfil.google_id_token = "";
      this._perfil = perfil;
    }
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  navegar(data: Menus, evento?: MouseEvent) {
    if (evento) {
      evento.stopPropagation();
    }
    if (this.modalService.hasOpenModals()) {
      this._componentStr = data.url
      this._component.emit(this._componentStr);
    } else {
      this.router.navigate([`${data.url}`])
    }
  }

  public ngOnDestroy() {
    if (this.mySesion.captchaSubscription) {
      this.mySesion.captchaSubscription.unsubscribe();
    }
  }
}
