import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Appointment } from '@models/appointment.model';
import { Observable } from 'rxjs';

const basePath = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  getAppointmentsByDoctor(doctorId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${basePath}/appointments?doctor.id=${doctorId}`);
  }
}
