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
  private currentTokenSubject: BehaviorSubject<any>;
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
          /* ----------------- get current user ------------------ */
          let decodedToken: any = res.token ? jwt_decode(res.token) : null;
          let currentRoles =
            decodedToken && decodedToken.roles ? decodedToken.roles : [];
          let isDoctor: boolean = currentRoles.indexOf(roles.ROLE_DOCTOR) > -1;
          let isPatient: boolean =
            currentRoles.indexOf(roles.ROLE_PATIENT) > -1;
          let mail: string =
            decodedToken && decodedToken.username ? decodedToken.username : '';
          if (mail) {
            if (isDoctor) {
              this._doctorService.getDoctorByMail(mail).subscribe((users) => {
                localStorage.setItem(CURRENT_USER, JSON.stringify(users[0]));
                this.currentUserSubject.next(users[0]);
              });
            } else if (isPatient) {
              this._patientService.getPatientByMail(mail).subscribe((users) => {
                localStorage.setItem(CURRENT_USER, JSON.stringify(users[0]));
                this.currentUserSubject.next(users[0]);
              });
            } else {
              this._userService.getUserByMail(mail).subscribe((users) => {
                localStorage.setItem(CURRENT_USER, JSON.stringify(users[0]));
                this.currentUserSubject.next(users[0]);
              });
            }
          }
          /* ----------------------------------------------------- */
          this.currentTokenSubject.next(res.token);
          this.decodedTokenSubject.next(jwt_decode(res.token));
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

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  getRoles(): string[] {
    let token = localStorage.getItem(ACCESS_TOKEN);
    let decodedToken = this.getDecodedAccessToken(token);
    return decodedToken && decodedToken.roles ? decodedToken.roles : [];
  }

  isDocotor(): boolean {
    let token = localStorage.getItem(ACCESS_TOKEN);
    let decodedToken = this.getDecodedAccessToken(token);
    let rolesList: string[] =
      decodedToken && decodedToken.roles ? decodedToken.roles : [];
    return rolesList.indexOf(roles.ROLE_DOCTOR) > -1;
  }

  isPatient(): boolean {
    let token = localStorage.getItem(ACCESS_TOKEN);
    let decodedToken = this.getDecodedAccessToken(token);
    let rolesList: string[] =
      decodedToken && decodedToken.roles ? decodedToken.roles : [];
    return rolesList.indexOf(roles.ROLE_PATIENT) > -1;
  }

  getMail(): string {
    let token = localStorage.getItem(ACCESS_TOKEN);
    let decodedToken = this.getDecodedAccessToken(token);
    return decodedToken && decodedToken.username ? decodedToken.username : '';
  }
}
