import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from './../../environments/environment';
import { Sesion } from './../common/sesion';

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
  getAllByEvent(slug: string): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/events/localities/${slug}`;
    try {
      const response = this.http.get(url, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  getLocalityByEvent(slugs: string[]): Observable<any> {
    if (slugs.length !== 2) {
      return this.handleError("Necesita tenes dos parametros");
    }
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/events/${slugs[0]}/localities/${slugs[1]}`;
    try {
      const response = this.http.get(url, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
