import { Component, OnInit } from '@angular/core';
import { Appointment } from '@models/appointment.model';
import { Patient } from '@models/patient.model';
import { AppointmentService } from '@services-api/appointment.service';
import { PatientService } from '@services-api/patient.service';
import { ToastService } from '@services/toast.service';
import { DoctorDashboardContainerComponent } from '../doctor-dashboard-container/doctor-dashboard-container.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  currentUser: any;
  appointmentsList: Appointment[] = [];
  currentDate: Date = new Date();
  oldPatients = {};
  selectedPatient: Patient;
  selectedAppontment: Appointment;
  displayPatientPopup: boolean;
  constructor(
    private _doctorDashboard: DoctorDashboardContainerComponent,
    private _patientService: PatientService,
    private _toastService: ToastService,
    private _appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.currentUser = this._doctorDashboard.currentUser;
    this.getAppointments();
  }

  getAppointments() {
    this.oldPatients = {};
    this._appointmentService
      .getAppointmentsByDoctor(this.currentUser.id)
      .subscribe((appointments) => {
        this.initProcess(appointments);
      });
  }

  initProcess(appointments?: Appointment[]) {
    if (appointments) {
      this.appointmentsList = appointments.sort((app_1, app_2) => {
        let date_1: Date = new Date(app_1.date + 'T' + app_1.startTime);
        let date_2: Date = new Date(app_2.date + 'T' + app_2.startTime);
        return date_1.getTime() - date_2.getTime();
      });
    }
    if (this.appointmentsList) {
      //oldPatients
      this.appointmentsList
        .filter((element) => {
          let elementDate: Date = new Date(
            element.date + 'T' + element.startTime
          );
          elementDate.setHours(0, 0, 0, 0);
          let currentDate: Date = new Date();
          currentDate.setHours(0, 0, 0, 0);
          return currentDate.getTime() > elementDate.getTime();
        })
        .map((appoitnment) => appoitnment.patient.id)
        .forEach(
          (patientID) => (this.oldPatients[`patient_${patientID}`] = true)
        );
    }
  }

  viewAppointment(appointment: Appointment) {
    this.selectedAppontment = appointment;
    this._patientService
      .getPatientById(appointment.patient.id)
      .subscribe((patient) => {
        this.selectedPatient = patient;
        this.displayPatientPopup = true;
      });
  }

  hidePatientPopup() {
    this.displayPatientPopup = false;
  }

  approveAppointment(appointment: Appointment) {
    console.log('approve');
    this._appointmentService
      .approveAppointment(appointment, appointment.id)
      .subscribe((res) => {
        appointment.status = 'Approved';
        this.initProcess();
        this._toastService.showSuccess(
          'Success',
          'Appointment with id: ' +
            appointment.id +
            ' was APPROVED successfully.'
        );
      });
  }

  rejectAppointment(appointment: Appointment) {
    console.log('reject');
    this._appointmentService
      .rejectAppointment(appointment, appointment.id)
      .subscribe((res) => {
        appointment.status = 'Canceled';
        this.initProcess();
        this._toastService.showSuccess(
          'Success',
          'Appointment with id: ' +
            appointment.id +
            ' was CANCELED successfully.'
        );
      });
  }
}
