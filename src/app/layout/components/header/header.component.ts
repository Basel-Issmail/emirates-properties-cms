import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'ep-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  @Output() logout = new EventEmitter();
  user: any = null;
  imageBaseUrl = environment.imageBaseUrl;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

}
