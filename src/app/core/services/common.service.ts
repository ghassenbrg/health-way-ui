import { Insurance } from './../models/insurance.model';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '@models/city.model';
import { AppointmentInput } from '@models/appointment.model';
import { Speciality } from '@models/specialty.model';

const basePath = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http: HttpClient) { }

  getCities() {
    return this._http.get<City[]>(`${basePath}/cities`);
  }

  getSpecialities() {
    return this._http.get<Speciality[]>(`${basePath}/specialties`);
  }

  getInsurances() {
    return this._http.get<Insurance[]>(`${basePath}/insurances`);
  }

  createAppointment(appointment: AppointmentInput) {
    return this._http.post<AppointmentInput>(`${basePath}/appointments`, appointment);
  }

}
