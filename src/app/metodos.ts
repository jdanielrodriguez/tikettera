import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { environment } from './../environments/environment';
import { Menus, Perfil } from './interfaces';
declare var $: any

@Injectable()
export class Sesion {
  constructor(
    private localSt: LocalStorageService,
    private cripto: Encript,
    private recaptchaV3Service: ReCaptchaV3Service,
    private _service: NotificationsService,
    private router: Router
  ) {
    this.actualizaPerfil();
  }
  @LocalStorage('lastLink') lastLinkStore!: string | null;
  @LocalStorage('currentPerfil') currentPerfil!: string;
  @BlockUI() blockUI!: NgBlockUI;

  perfil: Perfil = new Perfil();
  token = '';
  captchaSubscription!: Subscription;
  lastLink: string | null = '';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });
  encriptar(value: string | null): string {
    let newLetter: string = '';
    if (value) {
      value = this.cripto.encriptar((value));
      newLetter = value ? value : '';
    }
    return newLetter;
  }
  desencriptar(value: string): string {
    let newLetter: string | null = '';
    const decript = this.cripto.desencriptar(value);
    value = decript ? decript : '';
    newLetter = value;
    return newLetter;
  }
  validarSesion(): boolean {
    let response = false;
    const tempData = this.currentPerfil;
    let perfil: Perfil;
    if (tempData && !this.perfil) {
      const decript = this.desencriptar(tempData);
      perfil = tempData ? decript ? JSON.parse(decript) : null : null;
      if (parseInt(perfil.id + '', 10) > 0) {
        this.perfil = perfil;
      }
      response = parseInt(perfil.id + '', 10) > 0;
    } else if (this.perfil) {
      response = parseInt(this.perfil.id + '', 10) > 0;
    }
    return response;
  }
  async validateCaptcha(action: string): Promise<string> {
    if (this.captchaSubscription) {
      this.captchaSubscription.unsubscribe();
    }
    const prom: string = await new Promise((resolve, reject) => {
      this.captchaSubscription = this.recaptchaV3Service.execute(action)
        .subscribe({
          next: (token) => {
            resolve(token);
          },
          error: (error) => {
            if (error.msg) {
              reject(error.msg)
              this.createError(error.msg)
            } else {
              reject("Error desconocido, por favor trate otra vez")
              this.createError("Error desconocido, por favor trate otra vez")
            }
          },
          complete: () => { this.captchaSubscription.unsubscribe(); }
        });
    });
    return prom;
  }
  actualizaPerfil(perf?: Perfil): void {
    if (perf) {
      const tempData = this.currentPerfil;
      let perfil: Perfil;
      if (tempData) {
        const decript = this.desencriptar(tempData);
        perfil = this.perfil ? this.perfil : decript ? JSON.parse(decript) : null;
        if (perfil) {
          const per = perf ? this.encriptar(JSON.stringify(perf)) : null;
          if (per) {
            this.localSt.store('currentPerfil', per);
          } else {
            this.localSt.clear('currentPerfil');
          }
          this.perfil = perfil;
        } else {
          this.perfil = new Perfil();
        }

      } else {
        const per = perf ? this.encriptar(JSON.stringify(perf)) : null;
        this.localSt.store('currentPerfil', per);
      }
      this.perfil = perf;
    } else {
      let perfil: Perfil = new Perfil();
      if (this.currentPerfil && this.currentPerfil !== 'dW5kZWZpbmVk') {
        const decript = this.desencriptar(this.currentPerfil);
        const per = decript ? JSON.parse(decript) : null;
        if (per) {
          perfil = per;
        }
      }
      this.perfil = perfil;
    }
  }
  reloadToken(): void {
    const token = this.perfil.token ? this.perfil.token : '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: token ? 'Bearer ' + token : ''
    });
    this.headers = headers;
    this.token = token;
  }
  navegar(data: Menus, id?: number) {
    if (data.evento) {
      eval.call(data.evento, '');
    }
    this.router.navigate([data.url]);
    if (id && id > 0) {
      this.localSt.store('currentSelectedId', this.encriptar(id + ''));
    }
  }
  scrollTop() {
    $('html, body').animate({ scrollTop: 0 }, '300');
  }
  validarEmail(valor?: string): boolean {
    if (valor) {
      return (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor))
    }
    return false;
  }
  createSuccess(success: string) {
    this._service.success('¡Éxito!', success)
  }
  createError(error: string) {
    this._service.error('¡Error!', error)
  }
  loadingStart() {
    this.blockUI.start();
  }
  loadingStop() {
    this.blockUI.stop();
  }
}

@Injectable()
export class Encript {
  a2hex(str: string) {
    const arr = [];
    for (let i = 0, l = str.length; i < l; i++) {
      const hex = Number(str.charCodeAt(i)).toString(16);
      arr.push(hex);
    }
    return arr.join('');
  }
  dehex2(hexx: string) {
    const hex = hexx.toString(); // force conversion
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
  }
  a2oct(str: string) {
    const arr = [];
    for (let i = 0, l = str.length; i < l; i++) {
      const hex = Number(str.charCodeAt(i)).toString(8);
      arr.push(hex);
    }
    return arr.join('');
  }
  deoct2(hexx: string) {
    const hex = hexx.toString(); // force conversion
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 8));
    }
    return str;
  }
  encriptar(value: string): string | null {
    let newLetter = '';
    // valor string a base 64
    value = btoa(value);
    // valor de base 64 a hexadecimal
    value = this.a2hex(value);
    // value = this.a2oct(value);
    // valor de hexadecimal a octal
    // value = (Number(this.a2oct(value)) * 7) + '';
    // valor hexadecimal con el salt a base 64
    const salt = environment.salt.trim();
    value = btoa(btoa(value) + '@:@' + salt);
    // newLetter = value ? CryptoJS.AES.encrypt(value, salt, {
    //   keySize: 128 / 8,
    //   mode: CryptoJS.mode.CTR
    // }).toString() : null;
    newLetter = value;
    return newLetter;
  }
  desencriptar(value: string | null): string | null {
    let newLetter = '';
    let compare = false;
    if (value) {
      try {
        const salt = environment.salt.trim();
        // get valor con salt
        value = atob(value);
        // compare salt
        const newSalt = value.split('@:@')[1];
        value = value.split('@:@')[0];
        compare = newSalt === salt;
        // get valor octal
        value = atob(value);
        // valor de octal a hexadecimal
        //  value =this.deoct2(value);
        //  value = (Number(this.dehex2(value)) / 7) + '';
        // valor de hexadecimal a base 64
        value = this.dehex2(value);
        // valor de hexadecimal decifrar base 64
        value = atob(value);
        // valor hexadecimal con el salt a base 64
        // value = CryptoJS.AES.decrypt(value, salt, {
        //   keySize: 128 / 8,
        //   mode: CryptoJS.mode.CTR
        // }).toString(CryptoJS.enc.Utf8);
        // newLetter = value ? CryptoJS.enc.Base64.parse(value).toString(CryptoJS.enc.Utf8) : null
      } catch (e) {
        return null;
      }
      newLetter = value;
    }
    return compare ? newLetter : null;
  }

  decode(value: string | any): any {
    if (value.data && typeof value.data === 'string') {
      value.data = JSON.parse(value.data);
    } else if (typeof value === 'string') {
      value = JSON.parse(value);
    }
    return value;
  }

  encode(value: any): string {
    if (value.data && typeof value.data !== 'string') {
      value.data = JSON.stringify(value.data);
    } else if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    return value;
  }
}
@Injectable()
export class Formatos {
  constructor(
  ) { }
  getCleanedString(cadena: string) {
    // Definimos los caracteres que queremos eliminar
    const specialChars = '!@#$^&%*()+=-[]\/{}|:<>?,.';

    // Los eliminamos todos
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < specialChars.length; i++) {
      cadena = cadena.replace(new RegExp('\\' + specialChars[i], 'gi'), '');
    }
    // Lo queremos devolver limpio en minusculas
    // cadena = cadena.toLowerCase();

    // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
    // cadena = cadena.replace(/ /g,'_');

    // Quitamos acentos y 'ñ'. Fijate en que va sin comillas el primer parametro
    cadena = cadena.replace(/á/gi, 'a');
    cadena = cadena.replace(/é/gi, 'e');
    cadena = cadena.replace(/í/gi, 'i');
    cadena = cadena.replace(/ó/gi, 'o');
    cadena = cadena.replace(/ú/gi, 'u');
    cadena = cadena.replace(/ñ/gi, 'n');
    return cadena;
  }
}

@Injectable()
export class Constantes {
  constructor(
  ) { }
  get tasaIva() {
    return this._tasaIva;
  }
  private _tasaIva = 0.12;
}
