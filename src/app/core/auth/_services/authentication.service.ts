import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { roles } from '@core/config/roles';
import { Patient } from '@core/models/patient.model';
import { environment } from '@env/environment';
import { Doctor } from '@models/doctor.model';
import { User } from '@models/user.model';
import { DoctorService } from '@services-api/doctor.service';
import { PatientService } from '@services-api/patient.service';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

const basePath = environment.basePath;
const PREFIX = environment.prefix;
const ACCESS_TOKEN = `${PREFIX}_access_token`;
const CURRENT_USER = `${PREFIX}_current_user`;
const PROFILE = `${PREFIX}_profile`;
const LOCALEID = `${PREFIX}_locale_id`;
const REFRESH_TOKEN = `${PREFIX}_refresh_token`;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentTokenSubject: BehaviorSubject<any>;
  public currentUserSubject: BehaviorSubject<User | Doctor | Patient>;
  public decodedTokenSubject: BehaviorSubject<any>;

  constructor(
    private _userService: UserService,
    private _doctorService: DoctorService,
    private _patientService: PatientService,
    private http: HttpClient,
    private router: Router
  ) {
    let token = localStorage.getItem(ACCESS_TOKEN);
    this.currentTokenSubject = new BehaviorSubject<any>(JSON.parse(token));
    let decodedToken = token ? jwt_decode(token) : null;
    this.decodedTokenSubject = new BehaviorSubject<any>(decodedToken);
    let user = localStorage.getItem(CURRENT_USER);
    this.currentUserSubject = new BehaviorSubject<User | Doctor | Patient>(
      JSON.parse(user)
    );
  }

  public get currentToken(): User {
    return this.currentTokenSubject.value;
  }
  public get currentDecodedToken(): any {
    return this.currentTokenSubject.value;
  }
  public get currentUser(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${basePath}/login`, { username, password })
      .pipe(
        map((res) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(ACCESS_TOKEN, JSON.stringify(res.token));
          localStorage.setItem(
            REFRESH_TOKEN,
            JSON.stringify(res.refresh_token)
          );
          this.currentTokenSubject.next(res.token);
          this.decodedTokenSubject.next(jwt_decode(res.token));
          this.refreshCurrentUser(res.token);
          return res.token;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(CURRENT_USER);
    this.currentTokenSubject.next(null);
    this.decodedTokenSubject.next(null);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  refreshCurrentUser(token?: any) {
    let mail: string;
    let isDoctor: boolean;
    let isPatient: boolean;
    let currentRoles: string[];
    if (token) {
      let decodedToken: any = token ? jwt_decode(token) : null;
      currentRoles =
        decodedToken && decodedToken.roles ? decodedToken.roles : [];
      mail = decodedToken && decodedToken.username ? decodedToken.username : '';
    } else if (this.currentUser) {
      currentRoles = this.currentUser.roles ? this.currentUser.roles : [];
      mail = this.currentUser.email;
    }
    if (mail) {
      isDoctor = currentRoles.indexOf(roles.ROLE_DOCTOR) > -1;
      isPatient = currentRoles.indexOf(roles.ROLE_PATIENT) > -1;
      if (isDoctor) {
        this._doctorService.getDoctorsByMail(mail).subscribe((users) => {
          localStorage.setItem(CURRENT_USER, JSON.stringify(users[0]));
          this.currentUserSubject.next(users[0]);
        });
      } else if (isPatient) {
        this._patientService.getPatientsByMail(mail).subscribe((users) => {
          localStorage.setItem(CURRENT_USER, JSON.stringify(users[0]));
          this.currentUserSubject.next(users[0]);
        });
      } else {
        this._userService.getUsersByMail(mail).subscribe((users) => {
          localStorage.setItem(CURRENT_USER, JSON.stringify(users[0]));
          this.currentUserSubject.next(users[0]);
        });
      }
    }
  }

  getMail() {
    if (this.currentUser) {
      return this.currentUser.email;
    }
    return '';
  }
}
