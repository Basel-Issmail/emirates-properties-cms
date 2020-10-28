import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../core/services/spinner.service';
import { AuthService } from '../features/auth/services/auth.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'ep-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLargeScreen = false;
  constructor(public spinnerService: SpinnerService, private authService: AuthService, private router: Router, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    const layoutChanges = this.breakpointObserver.observe('(min-width: 768px)');

    layoutChanges.subscribe(result => {
      if (result.matches) {
        this.isLargeScreen = true;
      } else {
        this.isLargeScreen = false;
      }
    });
  }

  logout() {
    this.authService.logout().subscribe(response => {
      this.router.navigate(['auth/login']);
    })
  }

}
