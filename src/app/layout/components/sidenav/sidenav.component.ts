import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'ep-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  userRole: any;
  sideNavItems = [
    {
      title: 'Account', permission: ['admin', 'Company', 'agent'],
      children: [
        { title: 'Dashboard', permission: ['admin', 'Company', 'agent'], url: '/dashboard', icon: 'dashboard' },
        { title: 'CMS account', permission: ['admin', 'Company', 'agent'], url: '/profile', icon: 'account_circle' },
        { title: 'Company profile', permission: ['Company'], url: '/companies', icon: 'domain' }
      ]
    },
    {
      title: 'Users', permission: ['admin', 'Company'],
      children: [
        { title: 'Admins', permission: ['admin'], url: '/users', icon: 'supervised_user_circle' },
        { title: 'Companies', permission: ['admin'], url: '/companies', icon: 'domain' },
        { title: 'Agents', permission: ['admin', 'Company'], url: '/agents', icon: 'support_agent' },
        { title: 'Members', permission: ['admin'], url: '/members', icon: 'group' },
      ]
    },
    {
      title: 'Properties', permission: ['admin', 'Company', 'Agent'],
      children: [
        { title: 'Property', permission: ['admin', 'Company', 'Agent'], url: '/property', icon: 'domain' },
        { title: 'Amenity', permission: ['admin', 'Company', 'Agent'], url: '/amenity', icon: 'golf_course' },
        { title: 'Amenity categories', permission: ['admin'], url: '/amenity-category', icon: 'tapas' },
        { title: 'Property types', permission: ['admin'], url: '/property-type', icon: 'home_work' },
        { title: 'Property types categories', permission: ['admin'], url: '/property-type-category', icon: 'construction' },
        { title: 'Completion status', permission: ['admin'], url: '/completion-status', icon: 'fact_check' },
      ]
    },
    {
      title: 'Administrator', permission: ['admin'],
      children: [
        { title: 'Pages', permission: ['admin'], url: '/pages', icon: 'file_copy' },
        { title: 'Settings', permission: ['admin'], url: '/settings', icon: 'settings_input_composite' },
        { title: 'Blog', permission: ['admin'], url: '/blog', icon: 'cast' },
        { title: 'Countries', permission: ['admin'], url: '/countries', icon: 'public' },
        { title: 'Cities', permission: ['admin'], url: '/cities', icon: 'location_on' }
      ]
    },

  ]
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userRole = this.authService.user.role;
  }

}
