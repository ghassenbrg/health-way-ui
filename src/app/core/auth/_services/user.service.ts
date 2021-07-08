import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '@models/user.model';

const basePath = environment.basePath;

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${basePath}/users`);
    }

    getUserById(id: string) {
        return this.http.get<User>(`${basePath}/users/${id}`);
    }

    getUserByMail(mail: string) {
        return this.http.get<User>(`${basePath}/users?email=${mail}`);
    }
}