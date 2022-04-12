import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TarjetaCredito } from '../models/tarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  myAppUrl = 'https://localhost:5001/';
  myApiUrl = 'api/TarjetaDeCreditoes/';
  listData: TarjetaCredito[] = [];
  private actualizarFormulario = new BehaviorSubject<TarjetaCredito>({} as any);

  constructor(private http: HttpClient) { }

  guardarTarjeta(tarjeta: TarjetaCredito): Observable<TarjetaCredito> {
    return this.http.post<TarjetaCredito>(this.myAppUrl + this.myApiUrl, tarjeta);
  }

  actualizar(tarjeta: any){
    this.actualizarFormulario.next(tarjeta);
  }

  actualizarTarjeta(id: any, tarjeta: TarjetaCredito): Observable<TarjetaCredito>{
    return this.http.put<TarjetaCredito>(this.myAppUrl + this.myApiUrl + id, tarjeta);
  }

  obtenerTarjeta$(): Observable<TarjetaCredito>{
    return this.actualizarFormulario.asObservable();
  }

  eliminarTarjeta(id: number): Observable<TarjetaCredito> {
    return this.http.delete<TarjetaCredito>(this.myAppUrl + this.myApiUrl + id);
  }

  obtenerTarjetas() {
    this.http.get(this.myAppUrl + this.myApiUrl).subscribe(data => {
      this.listData = data as TarjetaCredito[];
    });
  }
}
