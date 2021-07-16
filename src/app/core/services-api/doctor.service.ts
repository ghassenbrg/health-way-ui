import { Feedback } from './../models/feedback.model';
import { TimeSheet } from './../models/timeSheet.model';
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

  getDoctorTimeSheet(doctorId: string) {
    return this.http.get<TimeSheet[]>(`${basePath}/time_sheets?doctor.id=${doctorId}`);
  }

  getDoctorfeedbacks(doctorId: string) {
    return this.http.get<Feedback[]>(`${basePath}/feedback?doctor.id=${doctorId}`);
  }

  addFeedback(feedback: Feedback) {
    return this.http.post<Feedback>(`${basePath}/feedback`, feedback);
  }

  getDoctorsBySpeciality(specialityName: string[]) {
    return this.http.get<Doctor[]>(`${basePath}/doctors?specialities.name=${specialityName}`);
  }

}
