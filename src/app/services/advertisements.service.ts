import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { Sesion } from '../common/sesion';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementsService {
  private basePath: string = environment.url;

  constructor(
    private http: HttpClient,
    private mySesion: Sesion
  ) {}

  private handleError(error: any): Observable<any> {
    return new Observable((observer) => { observer.error(error); });
  }

  getAdvertisements(): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/advertisements`;
    try {
      const response = this.http.get(url, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  createAdvertisement(data: any): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/advertisements`;
    try {
      const response = this.http.post(url, data, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  deleteAdvertisement(id: number): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/advertisements/${id}`;
    try {
      const response = this.http.delete(url, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  updateAdvertisementState(id: number, state: number): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/advertisements/${id}`;
    try {
      const response = this.http.put(url, { state }, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
