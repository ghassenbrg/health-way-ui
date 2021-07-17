import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Pharmacy } from '@models/pharamcy.model';
import { Observable } from 'rxjs';

const basePath = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class PharmacyService {
  constructor(private http: HttpClient) {}

  createPharmacy(doctor: any): Observable<Pharmacy> {
    return this.http.post<Pharmacy>(`${basePath}/pharmacies`, doctor);
  }

  updatePharmacy(doctor: Pharmacy, id: string): Observable<Pharmacy> {
    return this.http.put<Pharmacy>(`${basePath}/pharmacies/${id}`, doctor);
  }

  getAll(): Observable<Pharmacy[]> {
    return this.http.get<Pharmacy[]>(`${basePath}/pharmacies`);
  }

  getPharmacyById(id: string): Observable<Pharmacy> {
    return this.http.get<Pharmacy>(`${basePath}/pharmacies/${id}`);
  }
}
