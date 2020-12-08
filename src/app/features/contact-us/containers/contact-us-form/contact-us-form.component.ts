import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/features/profile/services/profile.service';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { ContactUsApis } from '../../contact-us.constants';

@Component({
  selector: 'ep-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss']
})
export class ContactUsFormComponent implements OnInit {
  contactInfo: any = null;
  contactForm: FormGroup;

  // Map Variables
  marker = { lng: 54.371185302734375, lat: 24.44313948954762 };
  mapCoords = { lng: 54.371185302734375, lat: 24.44313948954762 };

  constructor(private fb: FormBuilder, private sharedCrudService: SharedCrudService, private router: Router, private profileService: ProfileService) { }

  ngOnInit(): void {
    // this.contactInfo = this.authService.user;
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email,]],
      mobile: ['', [Validators.required]],
      whatsapp: ['', [Validators.required]],
      longitude: [''],
      latitude: ['']
    })
    this.sharedCrudService.getItemDetails(ContactUsApis.getData).subscribe(value => {
      this.contactForm.patchValue(value);
    })
  }

  get contactFormControl() {
    return this.contactForm.controls;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.sharedCrudService.editItem(ContactUsApis.update, this.contactForm.value).subscribe(
        response => {
        });
    }
  }

  refreshLocation(location) {
    this.contactFormControl.latitude.setValue(location.lat);
    this.contactFormControl.longitude.setValue(location.lng);
  }

  placeMarker($event) {
    this.marker = { lng: $event.coords.lng, lat: $event.coords.lat };
    this.refreshLocation(this.marker);
  }

}
