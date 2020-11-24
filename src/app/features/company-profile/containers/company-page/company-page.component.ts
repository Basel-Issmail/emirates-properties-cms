import { Component, OnInit } from '@angular/core';
import { ImageComponentComponent } from 'src/app/shared/components/image-component/image-component.component';
import { CompanyProfileApis } from '../../company-profile.constants';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { ImageUploaderService } from 'src/app/shared/components/image-uploader/image-uploader.service';
import { environment } from 'src/environments/environment';
import { CoreApis } from 'src/app/core/core.constants';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ep-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit {

  company$;
  company;
  imageBaseUrl = environment.imageBaseUrl;

  constructor(private sanitizer: DomSanitizer, public dialog: MatDialog,
    private imageService: ImageUploaderService, private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.company$ = this.sharedCrudService.get(CompanyProfileApis.getData, {}).pipe(tap((value: any) => {
      this.company = value.data;
    }));
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
          this.sharedCrudService.post(CompanyProfileApis.update, { ...this.company, logo: response.body.data.url }, 'Company logo updated')
            .subscribe((response: any) => {
              this.company = response.data;
            });

        })
      }
    });
  }

}
