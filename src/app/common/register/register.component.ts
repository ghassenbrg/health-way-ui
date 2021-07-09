import { Component, OnInit } from '@angular/core';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  doctorRegisterScreen: boolean;

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
        this._toastService.showWarn('Warning', 'Missing dev.');
        break;
    }
  }

}
