import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { User } from '@models/user.model';
import jwt_decode from 'jwt-decode';

const basePath = environment.basePath;
const PREFIX = environment.prefix;
const ACCESS_TOKEN = `${PREFIX}_access_token`;
const PROFILE = `${PREFIX}_profile`;
const LOCALEID = `${PREFIX}_locale_id`;
const REFRESH_TOKEN = `${PREFIX}_refresh_token`;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(ACCESS_TOKEN)));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${basePath}/login`, { username, password })
            .pipe(map(res => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem(ACCESS_TOKEN, JSON.stringify(res.token));
                localStorage.setItem(REFRESH_TOKEN, JSON.stringify(res.refresh_token));
                this.currentUserSubject.next(res.token);
                return res.token;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        this.currentUserSubject.next(null);
    }

    getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }

      getRoles(): string[] {
          let token = localStorage.getItem(ACCESS_TOKEN);
          let decodedToken = this.getDecodedAccessToken(token);
          return decodedToken.roles ? decodedToken.roles : [];
      }
}