import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Sesion } from './../metodos';
@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private basePath: string = environment.url;
  constructor(
    private http: HttpClient,
    private mySesion: Sesion
  ) {
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
  async getAll(): Promise<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/ventas`;
    try {
      const response = await this.http.get(url, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getAllFilter(data: any): Promise<any> {
    const filter = data.filter ? '?filter=' + data.filter : '';
    const url = `${this.basePath}/api/filter/${data.id}/ventas/${data.estado}${filter}`;
    this.mySesion.reloadToken();
    try {
      const response = await this.http.get(url, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async create(form: any): Promise<any> {
    const url = `${this.basePath}/api/ventas`;
    try {
      const response = await this.http.post(url, form, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async crearTransacciones(form: any): Promise<any> {
    const url = `${this.basePath}/api/transacciones/${form.id}/generar`;
    try {
      const response = await this.http.post(url, form, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async delete(id: number): Promise<any> {
    const url = `${this.basePath}/api/ventas/${id}`;
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
    const url = `${this.basePath}/api/ventas/${form.id}`;
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
    const url = `${this.basePath}/api/ventas/${id}`;
    try {
      const response = await this.http.get(url, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
