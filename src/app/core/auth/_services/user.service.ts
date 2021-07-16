import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';

const basePath = environment.basePath;

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${basePath}/users`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${basePath}/users/${id}`);
  }

  getUsersByMail(mail: string): Observable<User[]> {
    return this.http.get<User[]>(`${basePath}/users?email=${mail}`);
  }
}
