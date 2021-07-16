import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '@models/patient.model';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  @Input() currentUser: Patient;
  birthDate: Date;

  constructor() { }

  ngOnInit(): void {
    this.birthDate = new Date(this.currentUser.birthDate)
  }

}
