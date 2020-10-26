import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'ep-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
  }
}
