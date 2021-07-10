import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Doctor } from '@models/doctor.model';
import { User } from '@models/user.model';

const basePath = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  
  constructor(private http: HttpClient) { }

  createDoctor(doctor: Doctor | User) {
    return this.http.post<Doctor>(`${basePath}/doctors`, doctor);
  }

  getAll() {
    return this.http.get<Doctor[]>(`${basePath}/doctors`);
  }

  getDoctorById(id: string) {
    return this.http.get<Doctor>(`${basePath}/doctors/${id}`);
  }

  getDoctorByMail(mail: string) {
    return this.http.get<Doctor>(`${basePath}/doctors?email=${mail}`);
  }

}
