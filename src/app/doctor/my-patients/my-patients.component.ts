import { Component, OnInit } from '@angular/core';
import { Patient } from '@models/patient.model';
import { AppointmentService } from '@services-api/appointment.service';
import { PatientService } from '@services-api/patient.service';
import { ToastService } from '@services/toast.service';
import { DoctorDashboardContainerComponent } from '../doctor-dashboard-container/doctor-dashboard-container.component';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.scss'],
})
export class MyPatientsComponent implements OnInit {
  currentUser: any;
  patientsList: Patient[] = [];
  agesList: number[] = [];
  constructor(
    private _doctorDashboard: DoctorDashboardContainerComponent,
    private _patientService: PatientService,
    private _toastService: ToastService,
    private _appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.currentUser = this._doctorDashboard.currentUser;
    this.getPatients();
  }

  getPatients() {
    this.patientsList = [];
    this._appointmentService
      .getAppointmentsByDoctor(this.currentUser.id)
      .subscribe((appointments) => {
        appointments
          .map((appointment) => appointment.patient.id)
          .filter((element, index, self) => index === self.indexOf(element))
          .forEach((patientID) => {
            this._patientService
              .getPatientById(patientID)
              .subscribe((patient) => {
                let age = this.getAge(new Date(patient.birthDate));
                this.agesList.push(age);
                this.patientsList.push(patient);
              });
          });
      });
  }

  getAge(birthdate: Date) {
    let timeDiff = Math.abs(Date.now() - birthdate.getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
  }
}
