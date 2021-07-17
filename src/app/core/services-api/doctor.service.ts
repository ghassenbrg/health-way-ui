import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Doctor } from '@models/doctor.model';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';
import { Feedback } from './../models/feedback.model';
import { TimeSheet } from './../models/timeSheet.model';

const basePath = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  createDoctor(doctor: Doctor | User): Observable<Doctor> {
    return this.http.post<Doctor>(`${basePath}/doctors`, doctor);
  }

  updateDoctor(doctor: Doctor | User, id: string): Observable<Doctor> {
    return this.http.put<Doctor>(`${basePath}/doctors/${id}`, doctor);
  }

  createTimesheet(timesheet: TimeSheet): Observable<TimeSheet> {
    return this.http.post<TimeSheet>(`${basePath}/time_sheets`, timesheet);
  }

  updateTimesheet(timesheet: TimeSheet, id): Observable<TimeSheet> {
    return this.http.put<TimeSheet>(`${basePath}/time_sheets/${id}`, timesheet);
  }

  getAll(page?: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${basePath}/doctors?page=${page}`);
  }

  getDoctorById(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${basePath}/doctors/${id}`);
  }

  getDoctorsByMail(mail: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${basePath}/doctors?email=${mail}`);
  }

  getDoctorTimeSheet(doctorId: string): Observable<TimeSheet[]> {
    return this.http.get<TimeSheet[]>(
      `${basePath}/time_sheets?doctor.id=${doctorId}`
    );
  }

  getDoctorfeedbacks(doctorId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(
      `${basePath}/feedback?doctor.id=${doctorId}`
    );
  }

  addFeedback(feedback: Feedback) {
    return this.http.post<Feedback>(`${basePath}/feedback`, feedback);
  }

  getDoctorsByFilters(specialityNames?: string[], gender?: string, firstName?: string, lastName?: string) {
    let params: HttpParams = new HttpParams();
    if (specialityNames && specialityNames.length > 0) {
      specialityNames.forEach(speciality => {
        params = params.set('specialties.name[]',speciality)
      })
    }
    if (gender) {
      params = params.set('gender',gender)
    }
    if (firstName) {
      params = params.set('firstName',firstName)
    }
    if (lastName) {
      params = params.set('lastName',lastName)
    }
    return this.http.get<Doctor[]>(`${basePath}/doctors`, {params});
  }
}
