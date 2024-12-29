import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Sesion } from '../common/sesion';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {
  private basePath: string = environment.url;

  constructor(
    private http: HttpClient,
    private mySesion: Sesion
  ) { }

  private handleError(error: any): Observable<any> {
    return new Observable((observer) => { observer.error(error); });
  }

  getAll(userId?: number | null, payment_type_id: number = 1): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/payment-methods?user_id=${userId}&payment_type_id=${payment_type_id}`;
    return this.http.get(url, { headers: this.mySesion.headers }).pipe(
      catchError(this.handleError)
    );
  }

  create(data: any): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/payment-methods`;
    return this.http.post(url, data, { headers: this.mySesion.headers }).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number, userId: number): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/payment-methods/${id}`;
    const options = {
      headers: this.mySesion.headers,
      body: { user_id: userId },
    };
    return this.http.delete(url, options).pipe(catchError(this.handleError));
  }

  setDefault(id: number, data: any): Observable<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/api/payment-methods/${id}/default`;
    return this.http.put(url, data, { headers: this.mySesion.headers }).pipe(
      catchError(this.handleError)
    );
  }
}
