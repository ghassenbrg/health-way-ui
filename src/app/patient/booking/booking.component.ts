import { PatientService } from './../../core/services-api/patient.service';
import { AppointmentInput } from './../../core/models/appointment.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TIME_SHEET_MOCK } from '@app/common/mocks/timeSheet.mock';
import { TimeSheet } from '@models/timeSheet.model';
import * as moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { CommonService } from '@services/common.service';
import { ToastService } from '@services/toast.service';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})

export class BookingComponent implements OnInit {

  timeSheet: TimeSheet[] = TIME_SHEET_MOCK;
  newDate: Date = new Date();
  calendar: Calendar[] = []
  appointmentCalander: any = [];
  doctorIdentifier: string;
  patientIdentifier: string;
  appointementInput: AppointmentInput;

  constructor(
    private route: ActivatedRoute,
    private _patientService: PatientService,
    private _auth: AuthenticationService,
    private _commonService: CommonService,
    private _toastService: ToastService,
    private _loader: LoaderService) {}

  ngOnInit(): void {
    this.doctorIdentifier = this.route.snapshot.params.identifier;
    this.getCurrentPatient();
    this.prepareSlots();
  }

  getCurrentPatient() {

    let mail: string = this._auth.getMail();
    this._patientService.getPatientByMail(mail).subscribe(res => {

      this.patientIdentifier = res[0].id;
    }, err => {

    });
  }

  prepareSlots() {
    let minutesToAdd = 30;
    let currentSlotSeconds: number;
    let currentSlot: string;

    this.timeSheet.forEach((element) => {
      element.slots = [];
      currentSlotSeconds = this.convertToSeconds(element.startTime);
      for ( let i = 0; currentSlotSeconds < this.convertToSeconds(element.endTime); i++) {
        currentSlot = moment().hour(0).minute(0).seconds(currentSlotSeconds).add(minutesToAdd,'minutes').format("HH:mm:ss");
        element.slots.push({ time: currentSlot });
        currentSlotSeconds = this.convertToSeconds(currentSlot);
      }
    });
    this.buildCalendar();
  }

  convertToSeconds(time) {
    let splittedTime = time.toString().split(":");
    return (+splittedTime[0]) * 60 * 60 + (+splittedTime[1]) * 60 + (+splittedTime[2]);
  }

  chooseTiming(date: Date, time: string) {
    this.calendar.forEach((day) => {
      day.slots.forEach((slot) => {
        slot.isSelected = false;
      });
    });
    this.calendar.find((day) => day.date == date).slots.forEach(slot => {
      if (slot.time == time) {
        slot.isSelected = true;
      }
    });
  }

  getDates(startDate, endDate) {
    const dates = []
    let currentDate = startDate
    const addDays = function (days) {
      const date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
    }
    while (currentDate <= endDate) {
      dates.push(currentDate)
      currentDate = addDays.call(currentDate, 1)
    }
    return dates
  }

  buildCalendar() {
    let daysOfWeeks: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let calendarDates: Date[] = this.getDates(new Date(), new Date().setDate(new Date().getDate() + 30));
    calendarDates.forEach(date => {
      this.calendar.push({date: date})
    });
    this.calendar.forEach(element => {
      element.slots = this.timeSheet.find(timesheet => timesheet.day == daysOfWeeks[element.date.getDay()]) ? cloneDeep(this.timeSheet.find(timesheet => timesheet.day == daysOfWeeks[element.date.getDay()]).slots) : []
    });
  }

  proceed() {
    this.appointementInput = new AppointmentInput();
    let appointmentDate: Date;
    let appointmentStartTime: string;
    let appointmentEndTime: string;

    this.calendar.forEach(day => {
      for (let i = 0; i < day.slots.length; i++) {
        if (day.slots[i].isSelected) {
          appointmentDate = day.date;
          appointmentStartTime = day.slots[i].time;
          appointmentEndTime = day.slots[i +1].time;
        }
      }
    })
    appointmentDate.setHours(+appointmentStartTime.toString().substr(0,2))
    appointmentDate.setMinutes(+appointmentStartTime.toString().substr(3,2))
    appointmentDate.setSeconds(0);

    this.appointementInput.date = appointmentDate.toISOString();
    this.appointementInput.startTime = appointmentStartTime;
    this.appointementInput.endTime = appointmentEndTime;
    this.appointementInput.doctor = this.doctorIdentifier;
    this.appointementInput.patient = this.patientIdentifier;
    this.appointementInput.status = 'pending';


    this._commonService.createAppointment(this.appointementInput).subscribe(res => {

      this._toastService.showSuccess('Success', 'your appointment request has been sent successfully');
    }, err => {

    })

  }

}
export class Calendar {
    date?: Date;
    slots?: any
}
