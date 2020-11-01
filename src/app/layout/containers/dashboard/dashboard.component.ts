import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ImageComponentComponent } from 'src/app/shared/components/image-component/image-component.component';
import { ImageUploaderService } from 'src/app/shared/components/image-uploader/image-uploader.service';
import { FileHolder } from 'src/app/shared/components/image-uploader/file-holder';
import { CoreApis } from 'src/app/core/core.constants';
import { UserApis } from 'src/app/features/user/user.constants';
import { ProfileService } from 'src/app/features/profile/services/profile.service';

@Component({
  selector: 'ep-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any = null;
  imageBaseUrl = environment.imageBaseUrl;

  constructor(private authService: AuthService, private sanitizer: DomSanitizer, public dialog: MatDialog,
    private imageService: ImageUploaderService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  onFileChange(files: FileList) {
    console.log(files);


    const blob = new Blob([files[0]], { type: files[0].type });
    const objectURL = URL.createObjectURL(blob);
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    // this.readyToUpload.push({ src: sanitizedUrl, file: blob });
    const dialogRef = this.dialog.open(ImageComponentComponent, {
      width: '600px',
      data: { file: blob, aspectRatio: 1, format: 'jpeg' }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        let fileBlob: Blob,
          file: File,
          fileUrl: string;

        if (data instanceof Object) {
          fileUrl = (data.url) ? data.url : data.path;

          fileUrl = this.imageBaseUrl + fileUrl;
          fileBlob = (data.blob) ? data.blob : new Blob([data]);
          file = new File([fileBlob], data.fileName);
        }
        this.imageService.uploadImage(CoreApis.uploadPhoto, file, 'photo').subscribe((response: any) => {
          console.log(response);
          console.log(response.body);

          this.profileService.updateProfile({ ...this.user, profile_picture: response.body.data.url })
            .subscribe(response => {
              this.user = response.data;
            });

        })
      }
    });
  }
}

