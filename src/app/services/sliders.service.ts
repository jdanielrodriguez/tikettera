import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from './../../environments/environment';
import { Sesion } from './../common/sesion';

@Injectable({
  providedIn: 'root'
})
export class SlidersService {
  private basePath: string = environment.url;
  constructor(
    private http: HttpClient,
    private mySesion: Sesion
  ) {
  }
  private handleError(error: any): Observable<any> {
    return new Observable((observer) => { observer.error(error); });
  }
  getSingle(id: number): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/users/${id}`;
    try {
      const response = this.http.get(url, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
