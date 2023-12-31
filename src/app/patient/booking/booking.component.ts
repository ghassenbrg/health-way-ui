import { Doctor } from './../../core/models/doctor.model';
import { PatientService } from './../../core/services-api/patient.service';
import { AppointmentInput } from './../../core/models/appointment.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeSheet } from '@models/timeSheet.model';
import * as moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { CommonService } from '@services/common.service';
import { ToastService } from '@services/toast.service';
import { DoctorService } from '@services-api/doctor.service';
import { City } from '@models/city.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})

export class BookingComponent implements OnInit {

  timeSheet: TimeSheet[];
  newDate: Date = new Date();
  calendar: Calendar[] = []
  appointmentCalander: any = [];
  doctorIdentifier: string;
  doctorData: Doctor;
  patientIdentifier: string;
  appointementInput: AppointmentInput;
  cities: City[];
  ratingAverage: number;
  
  constructor(
    private route: ActivatedRoute,
    private _patientService: PatientService,
    private _auth: AuthenticationService,
    private _commonService: CommonService,
    private _toastService: ToastService,
    private _doctorService: DoctorService,
    private router: Router) {}

  ngOnInit(): void {
    this.doctorIdentifier = this.route.snapshot.params.identifier;
    this.getCurrentPatient();
    this.getDoctorData();
    this.prepareSlots();
  }

  getCurrentPatient() {
    this.patientIdentifier = this._auth.currentUser.id;
  }

  getDoctorData() {
    this._doctorService.getDoctorById(this.doctorIdentifier).subscribe(res => {
      this.doctorData = res;
      this.prepareCities();
    }, err => {
      
    });
  }

  prepareSlots() {
    let minutesToAdd = 30;
    let currentSlotSeconds: number;
    let currentSlot: string;

    this._doctorService.getDoctorTimeSheet(this.doctorIdentifier).subscribe(res => {
      this.timeSheet = res;
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
    }, err => {

    })

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

  viewDoctorProfile(id: number) {
    this.router.navigate(['/doctor-profile', { identifier: id }]);
  }

  prepareCities() {
    this._commonService.getCities().subscribe(res => {
      this.cities = res;
      if (this.doctorData.city) {
        this.doctorData.city = this.getCityId(this.doctorData.city);
        this.doctorData.cityName = this.cities.find(city => city.id == +this.doctorData.city).name;
      }
    }, err => {
    })
  }

  calculateRateAverage(feedbacks) {
    let raitingSum = 0;
    feedbacks.forEach((feedBack) => {
      raitingSum += feedBack.rating;
    });
    this.ratingAverage = raitingSum / feedbacks.length;
    return this.ratingAverage;
  }

  getCityId(cityId) {
    if (cityId.includes('/api/cities/')) {
      return cityId.replace('/api/cities/', '');
    }
    else {
      return cityId;
    }
  }

}
export class Calendar {
    date?: Date;
    slots?: any
}
