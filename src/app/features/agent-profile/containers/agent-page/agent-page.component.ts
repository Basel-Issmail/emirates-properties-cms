import { Component, OnInit } from '@angular/core';
import { AgentProfileApis } from '../../agent-profile.constants';
import { CoreApis } from 'src/app/core/core.constants';
import { ImageComponentComponent } from 'src/app/shared/components/image-component/image-component.component';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageUploaderService } from 'src/app/shared/components/image-uploader/image-uploader.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedCrudService } from 'src/app/shared/services/shared-crud.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'ep-agent-page',
  templateUrl: './agent-page.component.html',
  styleUrls: ['./agent-page.component.scss']
})
export class AgentPageComponent implements OnInit {

  agent$;
  agent;
  imageBaseUrl = environment.imageBaseUrl;

  constructor(private sanitizer: DomSanitizer, public dialog: MatDialog,
    private imageService: ImageUploaderService, private sharedCrudService: SharedCrudService) { }

  ngOnInit(): void {
    this.agent$ = this.sharedCrudService.get(AgentProfileApis.getData, {}).pipe(map((value: any) => {
      this.agent = value.data;
      value.data.languages = value.data.languages.map(language => language.name).join(', ');
      value.data.areas = value.data.areas.map(area => area.name).join(', ');
      return value;
    }));
  }


  onFileChange(files: FileList) {
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
          delete this.agent.active;
          delete this.agent.user;
          this.sharedCrudService.post(AgentProfileApis.update, { ...this.agent, logo: response.body.data.url }, 'agent image updated')
            .subscribe((response: any) => {
              this.agent = response.data;
            });

        })
      }
    });
  }

}
