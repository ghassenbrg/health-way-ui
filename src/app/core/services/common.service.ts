import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '@models/city.model';

const basePath = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http: HttpClient) { }

  getCities() {
    return this._http.get<City[]>(`${basePath}/citites`);
  }

}
