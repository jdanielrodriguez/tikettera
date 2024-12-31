import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from './../../environments/environment';
import { Sesion } from './../common/sesion';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private basePath: string = environment.url;

  constructor(
    private http: HttpClient,
    private mySesion: Sesion
  ) { }

  private handleError(error: any): Observable<any> {
    return new Observable((observer) => { observer.error(error); });
  }

  getAllByUser(userId: number): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/events?user_id=${userId}`;
    try {
      const response = this.http.get(url, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  getAll(): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/events`;
    try {
      const response = this.http.get(url, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
  getAllActive(): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/events/active`;
    try {
      const response = this.http.get(url, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  createEvent(eventData: any): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/events`;

    try {
      const response = this.http.post(url, eventData, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  updateEvent(id: number, eventData: any): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/events/${id}`;

    try {
      const response = this.http.put(url, eventData, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  deleteEvent(id: number): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/events/${id}`;

    try {
      const response = this.http.delete(url, { headers: this.mySesion.headers });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }
}
