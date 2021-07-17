import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Patient } from '@models/patient.model';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';

const basePath = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  createPatient(patient: Patient | User) {
    return this.http.post<Patient>(`${basePath}/patients`, patient);
  }

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${basePath}/patients`);
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${basePath}/patients/${id}`);
  }

  getPatientsByMail(mail: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${basePath}/patients?email=${mail}`);
  }

  updatePatient(patient: Patient | User, id: string): Observable<Patient> {
    return this.http.put<Patient>(`${basePath}/patients/${id}`, patient);
  }
}
