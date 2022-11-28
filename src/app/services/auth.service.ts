import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
  async Authentication(login: any): Promise<any> {
    const url = `${this.basePath}/api/login`;
    try {
      const response = await this.http.post(url, login)
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async logout(login: any): Promise<any> {
    const url = `${this.basePath}/api/logout`;
    this.mySesion.reloadToken();
    try {
      const response = await this.http.post(url, login, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async recovery(form: any): Promise<any> {
    const url = `${this.basePath}/api/users/password/reset`;
    try {
      const response = await this.http.post(url, form)
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async updatePass(form: any): Promise<any> {
    const url = `${this.basePath}/api/users/${form.id}/changepassword`;
    this.mySesion.reloadToken();
    try {
      const response = await this.http.post(url, form, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async updateImage(form: any): Promise<any> {
    const url = `${this.basePath}/api/avatar/${form.id}`;
    this.mySesion.reloadToken();
    try {
      const response = await this.http.put(url, form, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async deleteImage(id: number): Promise<any> {
    const url = `${this.basePath}/api/downgrade/${id}`;
    this.mySesion.reloadToken();
    try {
      const response = await this.http.get(url, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async validarCaptcha(data: any): Promise<any> {
    const url = `${this.basePath}/api/validarCaptcha`;
    this.mySesion.reloadToken();
    try {
      const response = await this.http.post(url, data, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

}
