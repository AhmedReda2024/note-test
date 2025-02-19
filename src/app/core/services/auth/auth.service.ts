import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  sendRegisterData(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.BASE_URL}/api/v1/users/signUp`,
      data
    );
  }

  sendLoginData(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.BASE_URL}/api/v1/users/signIn`,
      data
    );
  }
}
