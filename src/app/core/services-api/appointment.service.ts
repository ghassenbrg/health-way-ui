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

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${basePath}/appointments`, appointment);
  }

  updateAppointment(appointment: Appointment, id): Observable<Appointment> {
    return this.http.put<Appointment>(
      `${basePath}/appointments/${id}`,
      appointment
    );
  }

  getAppointmentsByDoctor(doctorId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${basePath}/appointments?doctor.id=${doctorId}`
    );
  }

  getAppointmentsByPatient(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${basePath}/appointments?patient.id=${patientId}`
    );
  }

  approveAppointment(appointment: Appointment, id): Observable<Appointment> {
    const body: Appointment = this.clone(appointment);
    body.patient = body.patient.id;
    body.doctor = body.doctor.id;
    body.status = 'Approved';
    return this.http.put<Appointment>(`${basePath}/appointments/${id}`, body);
  }

  rejectAppointment(appointment: Appointment, id): Observable<Appointment> {
    const body: Appointment = this.clone(appointment);
    body.patient = body.patient.id;
    body.doctor = body.doctor.id;
    body.status = 'canceled';
    return this.http.put<Appointment>(`${basePath}/appointments/${id}`, body);
  }

  clone(obj: any): any {
    if (obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    return undefined;
  }
}
