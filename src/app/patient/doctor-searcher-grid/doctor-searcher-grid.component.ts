import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '@models/doctor.model';

@Component({
  selector: 'app-doctor-searcher-grid',
  templateUrl: './doctor-searcher-grid.component.html',
  styleUrls: ['./doctor-searcher-grid.component.scss'],
})
export class DoctorSearcherGridComponent implements OnInit {
  @Input() doctors: Doctor[];
  @Input() pageSize: number;

  constructor(private route: Router) {}

  ngOnInit(): void {}

  viewDoctorProfile(id: number) {
    this.route.navigate(['/doctor-profile', { identifier: id }]);
  }

  bookAppointment(id: number) {
    this.route.navigate(['/booking', { identifier: id }]);
  }
}
