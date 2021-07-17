import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { Appointment } from '@models/appointment.model';
import { Patient } from '@models/patient.model';
import { AppointmentService } from '@services-api/appointment.service';

@Component({
  selector: 'app-patient-summary',
  templateUrl: './patient-summary.component.html',
  styleUrls: ['./patient-summary.component.scss']
})
export class PatientSummaryComponent implements OnInit {

  currentUser: any;
  appointmentsList: Appointment[] = [];

  constructor(    
    private _auth: AuthenticationService,
    private _appointmentService: AppointmentService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this._auth.currentUser;
    this.getAppointments();
  }

  getAppointments() {
    this._appointmentService
      .getAppointmentsByPatient(this.currentUser.id)
      .subscribe((appointments) => {
        this.appointmentsList = appointments;
        console.log(this.appointmentsList)
        if (this.appointmentsList) {
          // this.upcomingAppointmentsList = this.appointmentsList
          //   .filter((element) => {
          //     let elementDate: Date = new Date(
          //       element.date + 'T' + element.startTime
          //     );
          //     return this.currentDate.getTime() <= elementDate.getTime();
          //   })
          //   .sort((app_1, app_2) => {
          //     let date_1: Date = new Date(app_1.date + 'T' + app_1.startTime);
          //     let date_2: Date = new Date(app_2.date + 'T' + app_2.startTime);
          //     return date_1.getTime() - date_2.getTime();
          //   });
          // this.todayAppointmentsList = this.appointmentsList
          //   .filter((element) => {
          //     let elementDate: Date = new Date(
          //       element.date + 'T' + element.startTime
          //     );
          //     let firstHourInday: Date = new Date();
          //     firstHourInday.setHours(0, 0, 0, 0);
          //     let lastHourInday: Date = new Date();
          //     lastHourInday.setHours(23, 59, 59, 59);
          //     return (
          //       firstHourInday.getTime() <= elementDate.getTime() &&
          //       lastHourInday.getTime() >= elementDate.getTime()
          //     );
          //   })
          //   .sort((app_1, app_2) => {
          //     let date_1: Date = new Date(app_1.date + 'T' + app_1.startTime);
          //     let date_2: Date = new Date(app_2.date + 'T' + app_2.startTime);
          //     return date_1.getTime() - date_2.getTime();
          //   });
          //appoinments
          // this.statics.appoinments = this.todayAppointmentsList.length;
          //totalPatients
          // this.statics.totalPatients = this.appointmentsList
          //   .map((element) => element.patient.id)
          //   .filter(
          //     (element, index, self) => index === self.indexOf(element)
          //   ).length;
          //todayPatients
          // this.statics.todayPatients = this.todayAppointmentsList
          //   .map((element) => element.patient.id)
          //   .filter(
          //     (element, index, self) => index === self.indexOf(element)
          //   ).length;
        }
      });
  }

  viewDoctorProfile(id: number) {
    this.router.navigate(['/doctor-profile', { identifier: id }]);
  }

}
