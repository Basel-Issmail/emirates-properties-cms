import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserTokenService {

  constructor() { }


  static storeToken(token: any) {
    localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static logOut(): void {
    localStorage.removeItem('token');
  }
}
