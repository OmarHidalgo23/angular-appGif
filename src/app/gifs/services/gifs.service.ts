import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGIFResponse, Gif, Images } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = []
  public resultadosBusqueda: Gif[] = [];
  private api_key = 'fcLQW8zDMfomgWGIDBwUnPY2CppoZpQD';
  private url = 'https://api.giphy.com/v1/gifs';

  get historial() {
    return [...this._historial];
  }
  //importando todo el modulo de HTTP
  constructor(private http: HttpClient) {

    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
      this.resultadosBusqueda = JSON.parse(localStorage.getItem('data')!);
    }
  }

  buscarGifs(query: string) {
    if (query.trim().length > 0) {
      query = query.trim().toUpperCase();
      if (!this._historial.includes(query)) {
        this._historial.unshift(query);
        this._historial = this._historial.splice(0, 9);
        localStorage.setItem('historial', JSON.stringify(this._historial));

      }
      const params = new HttpParams()
        .set('api_key', this.api_key)
        .set('limit', '10')
        .set('q', query)
        .set('lang', 'es');


      this.http.get<SearchGIFResponse>(`${this.url}/search`, { params })
        .subscribe((respuesta) => {
          this.resultadosBusqueda = respuesta.data;
          localStorage.setItem('data', JSON.stringify(this.resultadosBusqueda));
        });

    }
  }
}
