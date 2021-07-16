import { Component, OnInit } from '@angular/core';
import { Appointment } from '@models/appointment.model';
import { AppointmentService } from '@services-api/appointment.service';
import { LoaderService } from '@services/loader.service';
import { DoctorDashboardContainerComponent } from '../doctor-dashboard-container/doctor-dashboard-container.component';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
})
export class DoctorDashboardComponent implements OnInit {
  currentUser: any;
  appointmentsList: Appointment[] = [];
  upcomingAppointmentsList: Appointment[] = [];
  todayAppointmentsList: Appointment[] = [];
  isTodaySelected: boolean;
  currentDate: Date = new Date();
  statics = { totalPatients: 0, todayPatients: 0, appoinments: 0 };

  constructor(
    private _doctorDashboard: DoctorDashboardContainerComponent,
    private _appointmentService: AppointmentService,
    private _loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.currentUser = this._doctorDashboard.currentUser;
    this.getAppointments();
  }

  getAppointments() {
    this._appointmentService
      .getAppointmentsByDoctor(this.currentUser.id)
      .subscribe((appointments) => {
        this.appointmentsList = appointments.filter(
          (element) => element.status != 'Canceled'
        );
        if (this.appointmentsList) {
          //upcomingAppointmentsList
          this.upcomingAppointmentsList = this.appointmentsList
            .filter((element) => {
              let elementDate: Date = new Date(
                element.date + 'T' + element.startTime
              );
              return this.currentDate.getTime() <= elementDate.getTime();
            })
            .sort((app_1, app_2) => {
              let date_1: Date = new Date(app_1.date + 'T' + app_1.startTime);
              let date_2: Date = new Date(app_2.date + 'T' + app_2.startTime);
              return date_1.getTime() - date_2.getTime();
            });
          //TodayAppointmentsList
          this.todayAppointmentsList = this.appointmentsList
            .filter((element) => {
              let elementDate: Date = new Date(
                element.date + 'T' + element.startTime
              );
              let firstHourInday: Date = new Date();
              firstHourInday.setHours(0, 0, 0, 0);
              let lastHourInday: Date = new Date();
              lastHourInday.setHours(23, 59, 59, 59);
              return (
                firstHourInday.getTime() <= elementDate.getTime() &&
                lastHourInday.getTime() >= elementDate.getTime()
              );
            })
            .sort((app_1, app_2) => {
              let date_1: Date = new Date(app_1.date + 'T' + app_1.startTime);
              let date_2: Date = new Date(app_2.date + 'T' + app_2.startTime);
              return date_1.getTime() - date_2.getTime();
            });
          //appoinments
          this.statics.appoinments = this.todayAppointmentsList.length;
          //totalPatients
          this.statics.totalPatients = this.appointmentsList
            .map((element) => element.patient.id)
            .filter(
              (element, index, self) => index === self.indexOf(element)
            ).length;
          //todayPatients
          this.statics.todayPatients = this.todayAppointmentsList
            .map((element) => element.patient.id)
            .filter(
              (element, index, self) => index === self.indexOf(element)
            ).length;
        }
      });
  }
}
