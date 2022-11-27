import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { Perfil, Carrito, Inventario, Proveedor, Menus, Producto } from './interfaces';
import { Subscription } from 'rxjs';
import { environment } from './../environments/environment';
export class Sesion implements OnInit {
  constructor(
    private localSt: LocalStorageService,
    private cripto: Encript,
    private recaptchaV3Service: ReCaptchaV3Service,
    private router: Router
  ) { }
  get perfil(): Perfil {
    return this._perfil;
  }
  get token(): string {
    return this._token;
  }
  get captchaSubscription(): Subscription {
    return this._captchaSubscription;
  }
  get lastLink(): string| null {
    const tempData = this.lastLinkStore;
    if (tempData) {
      this._lastLink = this.desencriptar(tempData);
    }
    return this._lastLink;
  }
  set lastLink(value: string | null) {
    const per = value ? this.encriptar(value) : null;
    if (per) {
      this.localSt.store('lastLink', per);
    } else {
      this.localSt.clear('lastLink');
    }
    this._lastLink = per;
  }
  get headers(): HttpHeaders {
    return this._headers;
  }
  @LocalStorage('lastLink')
  public lastLinkStore!: string | null;
  @LocalStorage('currentPerfil')
  public currentPerfil!: string;
  private _perfil: Perfil = new Perfil();
  private _token = '';
  private _captchaSubscription!: Subscription;
  private _captcha = '';
  private _lastLink: string | null = '';
  private _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });
  ngOnInit(): void {
    this.actualizaPerfil();
  }
  encriptar(value: string | null): string | null {
    let newLetter: string | null = '';
    if(value){
      value = this.cripto.encriptar((value));
      newLetter = value;
    }
    return newLetter;
  }
  desencriptar(value: string| null): string | null {
    let newLetter: string | null = '';
    value = this.cripto.desencriptar((value));
    newLetter = value;
    return newLetter;
  }
  public validarSesion(): boolean {
    let retun = false;
    const tempData = this.currentPerfil;
    let perfil: Perfil;
    if (tempData && !this._perfil) {
      const decript = this.desencriptar(tempData);
      perfil = tempData ? decript ? JSON.parse(decript) : null : null;
      if (parseInt(perfil.id + '', 10) > 0) {
        this._perfil = perfil;
      }
      retun = parseInt(perfil.id + '', 10) > 0;
    } else if (this._perfil) {
      retun = parseInt(this._perfil.id + '', 10) > 0;
    }
    return retun;
  }
  public async validateCaptcha(action: string): Promise<string> {
    if (this.captchaSubscription) {
      this.captchaSubscription.unsubscribe();
    }
    const prom: string = await new Promise((resolve, reject) => {
      this._captchaSubscription = this.recaptchaV3Service.execute(action)
        .subscribe((token) => {
          this._captcha = token;
          resolve(token);
        });
    });
    return prom;
  }
  public actualizaPerfil(perf?: Perfil): void {
    if (perf) {
      const tempData = this.currentPerfil;
      let perfil: Perfil;
      if (tempData) {
        const decript = this.desencriptar(tempData);
        perfil = this._perfil ? this._perfil : decript ? JSON.parse(decript) : null;
        if (perfil) {
          const per = perf ? this.encriptar(JSON.stringify(perf)) : null;
          if (per) {
            this.localSt.store('currentPerfil', per);
          } else {
            this.localSt.clear('currentPerfil');
          }
          this._perfil = perfil;
        } else {
          this._perfil = new Perfil();
        }

      } else {
        const per = perf ? this.encriptar(JSON.stringify(perf)) : null;
        this.localSt.store('currentPerfil', per);
      }
      this._perfil = perf;
    } else {
      let perfil: Perfil = new Perfil();
      if (this.currentPerfil && this.currentPerfil !== 'dW5kZWZpbmVk') {
        const decript = this.desencriptar(this.currentPerfil);
        const per = decript ? JSON.parse(decript) : null;
        if (per) {
          perfil = per;
        }
      }
      this._perfil = perfil;
    }
  }
  reloadToken(): void {
    const token = this.perfil.token ? this.perfil.token : '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: token ? 'Bearer ' + token : ''
    });
    this._headers = headers;
    this._token = token;
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

}

export class Encript implements OnInit {
  ngOnInit(): void {

  }
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
    // valor stirng a base 64
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
    if(value){
      try {
        const salt = environment.salt.trim();
        // oobtener valor con salt
        value = atob(value);
        // compara salt
        const newSalt = value.split('@:@')[1];
        value = value.split('@:@')[0];
        compare = newSalt === salt;
        // oobtener valor octal
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
}

export class Formatos implements OnInit {
  constructor(
  ) { }
  ngOnInit(): void {
  }
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

export class Constantes implements OnInit {
  constructor(
  ) { }
  get tasaIva() {
    return this._tasaIva;
  }
  private _tasaIva = 0.12;
  ngOnInit(): void {
  }
}
