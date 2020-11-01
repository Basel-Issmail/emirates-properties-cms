import { Injectable } from '@angular/core';
import { ProfileApis } from '../profile.constants';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { FlashMessageComponent } from 'src/app/shared/components/flash-message/flash-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private authService: AuthService, private _snackBar: MatSnackBar) { }

  updateProfile(user) {
    return this.http.post(ProfileApis.update, user).pipe(map((response: any) => {
      this.handleSuccess('Updated successfully');
      this.authService.user = response.data;
      return response;
    }));
  }


  changePassword(passwordObj) {
    return this.http.post(ProfileApis.changePassword, passwordObj).pipe(map((response: any) => {
      this.handleSuccess('Password updated successfully');
      return response;
    }));
  }


  handleSuccess(message) {
    this._snackBar.openFromComponent(FlashMessageComponent, {
      duration: 5000,
      panelClass: ["flash-success"],
      data: { title: 'Success', text: message, type: 'success' },
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
