import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Patient } from '@models/patient.model';
import { User } from '@models/user.model';

const basePath = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  createPatient(patient: Patient | User) {
    return this.http.post<Patient>(`${basePath}/patients`, patient);
  }

  getAll() {
    return this.http.get<Patient[]>(`${basePath}/patients`);
  }

  getPatientById(id: string) {
    return this.http.get<Patient>(`${basePath}/patients/${id}`);
  }

  getPatientByMail(mail: string) {
    return this.http.get<Patient>(`${basePath}/patients?email=${mail}`);
  }

}
