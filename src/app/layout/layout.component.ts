import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../core/services/spinner.service';
import { AuthService } from '../features/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ep-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(public spinnerService: SpinnerService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout().subscribe(response =>{
      this.router.navigate(['auth/login']);
    })
  }

}
