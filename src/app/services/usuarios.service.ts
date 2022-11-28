import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Sesion } from './../metodos';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private basePath: string = environment.url;
  constructor(
    private http: HttpClient,
    private mySesion: Sesion
  ) {
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
  async getAll(): Promise<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/users`;
    try {
      const response = await this.http.get(url, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }


  async create(form: any): Promise<any> {
    const url = `${this.basePath}/api/users`;
    try {
      const response = await this.http.post(url, form, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async addAddress(form: any): Promise<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/direcciones`;
    try {
      const response = await this.http.post(url, form, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async delete(id: number): Promise<any> {
    const url = `${this.basePath}/api/users/${id}`;
    try {
      const response = await this.http.delete(url)
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async update(form: any): Promise<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/users/${form.id}`;
    try {
      const response = await this.http.put(url, form, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getSingle(id: number): Promise<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/users/${id}`;
    try {
      const response = await this.http.get(url, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
