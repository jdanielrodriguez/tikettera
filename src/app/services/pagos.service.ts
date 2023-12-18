import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Sesion } from './../common/sesion';
@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private basePath: string = environment.url;
  constructor(
    private http: HttpClient,
    private mySesion: Sesion
  ) {
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
  async pagarQPP(form: any): Promise<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/qpago`;
    try {
      const response = await this.http.post(url, form, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async pagar2CO(form: any): Promise<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/pago2co`;
    try {
      const response = await this.http.post(url, form, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async pagarPAGALO(form: any): Promise<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/pagalo`;
    try {
      const response = await this.http.post(url, form, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
