import { Component, OnInit } from '@angular/core';
import { DoctorService } from '@app/doctor/doctor.service';
import { ToastService } from '@services/toast.service';
import { Router } from '@angular/router';
import { MainComponent } from '@app/main/main.component';
import { AuthenticationService } from '@auth/_services/authentication.service';
import { User } from '@models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  doctorRegisterScreen: boolean;
  userInput: User = new User();
  showLoader: boolean;
  genders: any = [ "Male", "Female"];

  constructor(private _toastService: ToastService) { }

  ngOnInit(): void {
  }

  register(registerType?: string) {
    switch (registerType) {
      case 'facebook':
      case 'google':
        this._toastService.showInfo('Info', 'Sorry, signUp via social networks is not yet available.');
        break;
      default:
        console.log(this.userInput)
        this._toastService.showWarn('Warning', 'Missing dev.');
        break;
    }
  }

}
