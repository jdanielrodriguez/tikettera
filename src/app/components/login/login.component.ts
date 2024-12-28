import { Component, EventEmitter, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Menus, Perfil, Response, ResponseCAPTCHA, Socialusers } from './../../interfaces';
import { Sesion } from './../../common/sesion';
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
    private fb: FormBuilder,
    private authService: AuthServices,
    private modalService: NgbModal,
    private userService: UsuariosService,
    private mySesion: Sesion,
  ) { }
  auth: any;
  component: EventEmitter<string> = new EventEmitter<string>();
  componentStr!: string;
  @ViewChild(Modal) loginModal!: Modal;
  socialusers = new Socialusers();
  @Input() esModal!: boolean;
  @Input() muestraTexto = false;
  @Input() titulo = '';
  @Input() dinamicLink = '';
  loginForm!: FormGroup;

  async socialSignIn(socialProvider: string) {
    // this.mySesion.loadingStart();
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
    //   this.mySesion.loadingStop();
    //   console.log(error);

    // });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    const perfil = { email, password: this.mySesion.encriptar(password) };
    this.simpleSignIn(perfil);
  }
  async simpleSignIn(perfil: any) {
    let validateCaptcha = await this.mySesion.validateCaptcha('login');
    if (!validateCaptcha) {
      this.mySesion.createError("Error validando Captcha.");
      this.mySesion.loadingStop();
      validateCaptcha = await this.mySesion.validateCaptcha('login');
      this.simpleSignIn(perfil);
      return;
    }

    const captchaData = { token: btoa(validateCaptcha) };
    const authServ: any = this.authService.validarCaptcha(captchaData).subscribe({
      next: () => this.autenticate(perfil),
      error: () => {
        this.mySesion.createError('Error iniciando sesión');
        this.mySesion.loadingStop();
      },
      complete: () => authServ.unsubscribe(),
    });
  }

  autenticate(perfil: any) {
    this.mySesion.loadingStart();
    const authServ: any = this.authService.Authentication(perfil).subscribe({
      next: (response: Response) => {
        this.mySesion.loadingStop();
        if (response.status >= 400) {
          this.mySesion.createError(response.msg || 'Error en la autenticación');
          return;
        }
        const decryptedProfile = response.objeto ? JSON.parse(this.mySesion.desencriptar(response.objeto)) : null;
        this.mySesion.actualizaPerfil(decryptedProfile);
        this.mySesion.navegar({ url: './' });
      },
      error: (e) => {
        this.mySesion.createError(`Error iniciando sesión: ${e.error.msg}`);
        this.mySesion.loadingStop();
      },
      complete: () => authServ.unsubscribe(),
    });
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.mySesion.scrollTop();
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

    this.mySesion.showCaptcha();
  }
  registrar(perfil: Perfil) {
    perfil.picture = perfil.picture ? perfil.picture : 'https://robohash.org/68.186.255.198.png';
    const data = {
      user: this.mySesion.encriptar(JSON.stringify(perfil))
    };
    const request = this.userService.create(data).subscribe({
      next: (response: { status: number, objeto: Perfil, msg?: string }) => {
        if (response.status >= 400) {
          this.mySesion.createError(response.msg ? response.msg : '');
        } else {
          this.mySesion.actualizaPerfil(response.objeto);
          if (this.mySesion.validarSesion()) {
            this.mySesion.hideCaptcha();
            this.mySesion.navegar({ url: './dashboard/inicio' });
          } else {
            this.mySesion.createError('Error iniciando sesión');
          }
        }
        this.mySesion.loadingStop();
      },
      error: (error) => {
        if (error.msg) {
          this.mySesion.createError(error.msg);
        } else {
          this.mySesion.createError('Error desconocido, por favor trate otra vez');
        }
        console.log(error);
        this.mySesion.loadingStop();
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

  ngOnDestroy() {
    if (this.mySesion.captchaSubscription) {
      this.mySesion.captchaSubscription.unsubscribe();
    }
  }
}
