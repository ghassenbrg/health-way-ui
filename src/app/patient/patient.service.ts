import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '@models/user.model';

const basePath = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  createPatient(patient: User) {
    return this.http.post<User>(`${basePath}/patients`,patient);
  }

}
