import { Component, EventEmitter, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Menus, Perfil, Socialusers } from './../../interfaces';
import { Sesion } from './../../metodos';
import { AuthServices } from './../../services/auth.service';
import { UsuariosService } from './../../services/usuarios.service';
import { Modal } from './../modal.component';
declare var $: any;
@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private authenticationService: AuthServices,
    private modalService: NgbModal,
    private userService: UsuariosService,
    private _service: NotificationsService,
    private mySesion: Sesion,
  ) { }
  auth: any;
  component: EventEmitter<string> = new EventEmitter<string>();
  componentStr!: string;
  @ViewChild(Modal) loginModal!: Modal;
  @BlockUI() blockUI!: NgBlockUI;
  socialusers = new Socialusers();
  @Input() esModal!: boolean;
  @Input() muestraTexto = false;
  @Input() titulo = '';
  @Input() dinamicLink = '';

  public socialSignIn(socialProvider: string) {
    // this.blockUI.start();
    // let socialPlatformProvider: string;
    // if (socialProvider === 'facebook') {
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // } else if (socialProvider === 'google') {
    //   socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    // }
    // this.OAuth.signIn(socialPlatformProvider).then((socialusers: Socialusers) => {
    //   const perfil = new Perfil();
    //   const cliente = new Cliente();
    //   perfil.codigo = socialusers.id;
    //   perfil.password = btoa(socialusers.id);
    //   perfil.google = socialProvider;
    //   perfil.idToken = socialusers.idToken ? socialusers.idToken : '';
    //   perfil.nombre = socialusers.name;
    //   cliente.nombre = socialusers.firstName;
    //   cliente.apellido = socialusers.lastName;
    //   if (socialProvider === 'facebook') {
    //     perfil.google_id = socialusers.id;
    //     perfil.facebook_id = socialusers.id;
    //     perfil.google_token = socialusers.authToken;
    //   } else if (socialProvider === 'google') {
    //     perfil.google_id = socialusers.id;
    //     perfil.google_token = socialusers.authToken;
    //     perfil.idToken = socialusers.authToken;
    //   }
    //   perfil.google_idToken = socialusers.idToken ? socialusers.idToken : '';
    //   perfil.email = socialusers.email;
    //   perfil.username = socialusers.email.split('@')[0];
    //   perfil.picture = socialusers.photoUrl;
    //   cliente.estado = 1;
    //   perfil.estado = 1;
    //   cliente.nombre_a_facturar = socialusers.name;
    //   this._cliente = cliente;
    //   this.login(perfil, true);
    // }).catch(error => {
    //   this.blockUI.stop();
    //   console.log(error);

    // });
  }
  async simpleSignIn(form: NgForm) {
    let socialusers: Perfil = new Perfil(form.value);
    socialusers.password = this.mySesion.encriptar(socialusers.password);
    let validateCaptcha = await this.mySesion.validateCaptcha('login');
    if (!validateCaptcha) {
      this.mySesion.createError("Error validando Captcha.");
      this.mySesion.loadingStop();
      validateCaptcha = await this.mySesion.validateCaptcha('login');
      this.simpleSignIn(form);
      return;
    }
    const captchaData = {
      token: btoa(validateCaptcha)
    };
    const authServ = this.authenticationService.validarCaptcha(captchaData)
      .subscribe({
        next: (response: { status: number, objeto: any }) => {
          if (response.objeto.success) {
            this.autenticate(socialusers);
          }
        },
        error: async error => {
          console.log(error);
          this.createError('Error iniciando sesion');
          this.blockUI.stop();
        },
        complete: () => { authServ.unsubscribe(); }
      });
  }
  async autenticate(socialusers: Perfil) {
    const authServ = this.authenticationService.Authentication(socialusers)
      .subscribe({
        next: (response: Perfil) => {
          this.mySesion.actualizaPerfil(response);
          if (this.mySesion.validarSesion()) {
            $('.grecaptcha-badge').removeClass('visible');
            // if (this.modalService.hasOpenModals) {
            //   this.closeModal();
            // }
            this.mySesion.actualizaPerfil();
            if (this.mySesion.lastLink) {
              this.blockUI.stop();
              let linkURL = './dashboard/inicio';
              if (this.mySesion.lastLink.length > 3) {
                const urls = this.mySesion.lastLink;
                linkURL = urls;
              }
              if (linkURL) {
                this.mySesion.actualizaPerfil();
                this.mySesion.lastLink = null;
                this.router.navigate([`${linkURL}`]);
              } else {
                this.router.navigate([`./dashboard/inicio`]);
              }
            } else {
              this.router.navigate([`./dashboard/inicio`]);
            }
          } else {
            this.createError('Error iniciando sesion');
          }
          this.blockUI.stop();
        },
        error: (e) => {
          if (e.status === 404) {
            this.createError('Usuario no encontrado');
          } else if (e.status === 401) {
            if (socialusers.auth_type === 'facebook' || socialusers.auth_type === 'google') {
              this.blockUI.start();
              // socialusers.password = this.mySesion.desencriptar(socialusers.password);
              this.registrar(socialusers);
            } else {
              this.createError('Usuario o Contraseña Incorrectas');
            }
          } else {
            this.createError('Error iniciando sesion');
          }
          console.log(e);
          this.blockUI.stop();
        },
        complete: () => { authServ.unsubscribe(); }
      });
  }
  ngOnInit() {
    $('html, body').animate({ scrollTop: 0 }, '300');
    if (this.esModal) {
      const temp = Modal;
      if (this.titulo) {
        if (this.loginModal) {
          this.loginModal.titulo = this.titulo;
        }
      }
      temp.prototype.titulo = this.titulo;
      this.modalService.open(temp);
    }
    setTimeout(() => {
      $('.grecaptcha-badge').removeClass('visible');
      $('.grecaptcha-badge').addClass('visible');
    }, 1000);
  }
  registrar(perfil: Perfil) {
    perfil.picture = perfil.picture ? perfil.picture : 'https://robohash.org/68.186.255.198.png';
    const data = {
      user: this.mySesion.encriptar(JSON.stringify(perfil))
    };
    const request = this.userService.create(data)
      .subscribe({
        next: (response: { status: number, objeto: Perfil, msg?: string }) => {
          if (response.status >= 400) {
            this.createError(response.msg ? response.msg : '');
          } else {
            this.mySesion.actualizaPerfil(response.objeto);
            if (this.mySesion.validarSesion()) {
              $('.grecaptcha-badge').removeClass('visible');
              // if (this.modalService.hasOpenModals) {
              //   this.closeModal();
              // }
              if (this.mySesion.lastLink) {
                this.blockUI.stop();
                let linkURL = './dashboard/inicio';
                if (this.mySesion.lastLink.length > 3) {
                  const urls = this.mySesion.lastLink;
                  linkURL = urls;
                }
                if (linkURL) {
                  this.mySesion.lastLink = null;
                  this.router.navigate([`${linkURL}`]);
                } else {
                  this.router.navigate([`./dashboard/inicio`]);
                }
              } else {
                this.router.navigate([`./dashboard/inicio`]);
              }
            } else {
              this.createError('Error iniciando sesion');
            }
          }
          this.blockUI.stop();
        },
        error: (error) => {
          if (error.msg) {
            this.createError(error.msg);
          } else {
            this.createError('Error desconocido, por favor trate otra vez');
          }
          console.log(error);
          this.blockUI.stop();
        },
        complete: () => { request.unsubscribe(); }
      });
  }
  navegar(data: Menus, evento?: MouseEvent) {
    if (this.modalService.hasOpenModals()) {
      this.componentStr = data.url;
      this.component.emit(this.componentStr);
    } else {
      this.mySesion.navegar({ url: `${data.url}` });
    }
    if (evento) {
      evento.stopPropagation();
    }
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success);
  }
  createError(error: string) {
    this._service.error('¡Error!', error);
  }
  public ngOnDestroy() {
    if (this.mySesion.captchaSubscription) {
      this.mySesion.captchaSubscription.unsubscribe();
    }
  }
}
