import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '@models/doctor.model';

@Component({
  selector: 'app-doctor-searcher-list',
  templateUrl: './doctor-searcher-list.component.html',
  styleUrls: ['./doctor-searcher-list.component.scss']
})
export class DoctorSearcherListComponent implements OnInit {
  
  @Input() doctors: Doctor[];
  @Input() pageSize: number;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  viewDoctorProfile(id: number) {
    this.route.navigate(['/doctor-profile', { identifier: id }]);
  }

  bookAppointment(id: number) {
    this.route.navigate(['/booking', { identifier: id }]);
  }

}
