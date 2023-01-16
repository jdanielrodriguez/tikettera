import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from './../../environments/environment';
import { Sesion } from './../metodos';
@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private basePath: string = environment.url;
  constructor(
    private http: HttpClient,
    private mySesion: Sesion
  ) {
  }
  private handleError(error: any): Observable<any> {
    return new Observable((observer) => { observer.error(error); });
  }
  Authentication(login: any): Observable<any> {
    const url = `${this.basePath}/api/login`;
    try {
      const response = this.http.post(url, login);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  logout(login: any): Observable<any> {
    const url = `${this.basePath}/api/logout`;
    this.mySesion.reloadToken();
    try {
      const response = this.http.post(url, login, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  recovery(form: any): Observable<any> {
    const url = `${this.basePath}/api/users/password/reset`;
    try {
      const response = this.http.post(url, form);
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  updatePass(form: any): Observable<any> {
    const url = `${this.basePath}/api/users/${form.id}/changepassword`;
    this.mySesion.reloadToken();
    try {
      const response = this.http.post(url, form, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  updateImage(form: any): Observable<any> {
    const url = `${this.basePath}/api/avatar/${form.id}`;
    this.mySesion.reloadToken();
    try {
      const response = this.http.put(url, form, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  deleteImage(id: number): Observable<any> {
    const url = `${this.basePath}/api/downgrade/${id}`;
    this.mySesion.reloadToken();
    try {
      const response = this.http.get(url, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  validarCaptcha(data: any): Observable<any> {
    const url = `${this.basePath}/api/validate-captcha`;
    this.mySesion.reloadToken();
    try {
      const response = this.http.post(url, data, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

}
