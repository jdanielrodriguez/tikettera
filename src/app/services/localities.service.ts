import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from './../../environments/environment';
import { Sesion } from './../metodos';

@Injectable({
  providedIn: 'root'
})
export class LocalitiesService {
  private basePath: string = environment.url;
  constructor(
    private http: HttpClient,
    private mySesion: Sesion
  ) {
  }
  private handleError(error: any): Observable<any> {
    return new Observable((observer) => { observer.error(error); });
  }
  getAll(): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/localities`;
    try {
      const response = this.http.get(url, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  getAllActive(): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/localities/active`;
    try {
      const response = this.http.get(url, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async create(form: any): Promise<any> {
    const url = `${this.basePath}/api/proveedores`;
    this.mySesion.reloadToken();
    try {
      const response = await this.http.post(url, form, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  async delete(id: number): Promise<any> {
    const url = `${this.basePath}/api/proveedores/${id}`;
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
    const url = `${this.basePath}/api/proveedores/${form.id}`;
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
    const url = `${this.basePath}/api/proveedores/${id}`;
    try {
      const response = await this.http.get(url, { headers: this.mySesion.headers })
        .toPromise();
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
