import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Sesion } from './../metodos';
import { Pasarela, Comision } from './../interfaces';
@Injectable({
  providedIn: 'root'
})
export class ComisionesService {
  private basePath: string = environment.url;
  constructor(
    private http: HttpClient,
    private mySesion: Sesion
  ) {
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
  async getAllFilter(data: any): Promise<any> {
    const filter = data.filter ? '?filter=' + data.filter : '';
    const url = `${this.basePath}/api/filter/${data.id}/comisiones/${data.estado}${filter}`;
    this.mySesion.reloadToken();
    const response = await this.http.get(url, { headers: this.mySesion.headers })
      .toPromise();
    return response;
  }
  async getTransaccionesFilter(data: any): Promise<any> {
    const filter = data.filter ? '?filter=' + data.filter : '';
    const url = `${this.basePath}/api/filter/${data.id}/transacciones/${data.estado}${filter}`;
    this.mySesion.reloadToken();
    try {
      const response = await this.http.get(url, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getPasarelasFilter(data: any): Promise<any> {
    const filter = data.filter ? '?filter=' + data.filter : '';
    const url = `${this.basePath}/api/filter/${data.id}/pasarelas/${data.estado}${filter}`;
    this.mySesion.reloadToken();
    try {
      const response = await this.http.get(url, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async cargarPasarelas(): Promise<Pasarela> {
    let dat: Pasarela = new Pasarela();
    const data = {
      id: 0,
      estado: 1,
      filter: 'estado'
    };
    await this.getPasarelasFilter(data)
      .then((response: Pasarela) => {
        dat = response;
      })
      .catch(error => {
        if (error.status === 401 && !error.ok) {
          this.mySesion.navegar({ url: './logout' });
        }
        return dat;
      });
    return dat;
  }
  async cargarComision(total: number): Promise<Comision> {
    let dat: Comision = new Comision();
    const data = {
      id: 0,
      estado: total,
      filter: 'ventas-aplicar'
    };
    await this.getAllFilter(data)
      .then((response: Comision) => {
        dat = response;
      })
      .catch(error => {
        if (error.status === 401 && !error.ok) {
          this.mySesion.navegar({ url: './logout' });
        }
        return dat;
      });
    return dat;
  }

  async cargarComisionRetiro(total: number): Promise<Comision> {
    let dat: Comision = new Comision();
    const data = {
      id: 0,
      estado: total,
      filter: 'retiro-aplicar'
    };
    await this.getAllFilter(data)
      .then((response: Comision) => {
        dat = response;
      })
      .catch(error => {
        if (error.status === 401 && !error.ok) {
          this.mySesion.navegar({ url: './logout' });
        }
        return dat;
      });
    return dat;
  }
}
