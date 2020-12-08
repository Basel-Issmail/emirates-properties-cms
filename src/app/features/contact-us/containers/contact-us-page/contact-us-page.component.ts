import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ImageUploaderService } from 'src/app/shared/components/image-uploader/image-uploader.service';
import { ProfileService } from 'src/app/features/profile/services/profile.service';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { ContactUsApis } from '../../contact-us.constants';

@Component({
  selector: 'ep-contact-us-page',
  templateUrl: './contact-us-page.component.html',
  styleUrls: ['./contact-us-page.component.scss']
})
export class ContactUsPageComponent implements OnInit {
  contactInfo: any = null;
  imageBaseUrl = environment.imageBaseUrl;

  constructor(private authService: AuthService, private sharedCrudService: SharedCrudService, public dialog: MatDialog,
    private imageService: ImageUploaderService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.sharedCrudService.getItemDetails(ContactUsApis.getData).subscribe(value => {
      this.contactInfo = value;
    })
  }
}
