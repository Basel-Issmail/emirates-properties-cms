import { Injectable } from '@angular/core';
import { ProfileApis } from '../profile.constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  updateProfile(user) {
    return this.http.post(ProfileApis.update, user).pipe(map((response: any) => {
      this.authService.user = response.data;
      return response;
    }));
  }


  changePassword(passwordObj) {
    return this.http.post(ProfileApis.changePassword, passwordObj);
  }
}
