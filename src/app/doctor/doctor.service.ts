import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '@models/user.model';

const basePath = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  createDoctor(doctor: User) {
    return this.http.post<User>(`${basePath}/doctors`,doctor);
  }

}
