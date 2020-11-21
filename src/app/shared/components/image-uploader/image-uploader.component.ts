import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FileHolder } from './file-holder';
import { ImageComponentComponent } from '../image-component/image-component.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ImageUploaderService } from './image-uploader.service';
import { CaptionComponent } from '../caption/caption.component';

@Component({
  selector: 'ep-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit, OnChanges {
  files: FileHolder[] = [];
  fileCounter = 0;
  fileOver = false;
  showFileTooLargeMessage = false;
  destFile = null;

  @Input() clearButton = true;
  @Input() pathPrefix = '';
  @Input() buttonCaption = 'Select Images';
  @Input() allowCaption = false;
  @Input() firstMain = false;
  @Input() disabled = false;
  @Input() fileTooLargeMessage: string;
  @Input() max = 100;
  @Input() maxFileSize: number;
  @Input() preview = true;
  @Input() partName: string;
  @Input() supportedExtensions: string[];
  @Input() url: string;
  @Input() uploadedFiles: any | string[] | Array<{ url: string, fileName: string, blob?: Blob }> = [];
  @Output() triggerChange = new EventEmitter();
  @Input() crop = false;
  @Input() aspectRatio = 4 / 3;
  @Input() format = 'jpeg';

  @ViewChild('input')
  private inputElement: ElementRef;
  private pendingFilesCounter = 0;

  readyToUpload = [];

  @Input() beforeUpload: (metadata: any) => any | Promise<any> = metadata => metadata;
  constructor(private imageService: ImageUploaderService, public dialog: MatDialog, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (!this.fileTooLargeMessage) {
      this.fileTooLargeMessage = 'An image was too large and was not uploaded.' + (this.maxFileSize ? (' The maximum file size is ' + this.maxFileSize / 1024) + 'KiB.' : '');
    }

    this.supportedExtensions = this.supportedExtensions ? this.supportedExtensions.map((ext) => ext) : ['image/*'];
  }

  deleteAll() {
    this.files = [];
    this.fileCounter = 0;
    if (this.inputElement) {
      this.inputElement.nativeElement.value = '';
    }
    this.triggerChange.emit(this.getProcessedResult());
  }

  deleteFile(file: FileHolder): void {
    const index = this.files.indexOf(file);
    this.files.splice(index, 1);
    this.fileCounter--;
    if (this.inputElement) {
      this.inputElement.nativeElement.value = '';
    }
    this.triggerChange.emit(this.getProcessedResult());
  }

  addCaption(file: FileHolder) {
    const dialogRef = this.dialog.open(CaptionComponent, {
      data: file['caption'],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(formData => {
      if (formData) {
        file['caption'] = formData;
        this.triggerChange.emit(this.getProcessedResult());
      }
    });
  }

  ngOnChanges(changes) {
    if (changes.uploadedFiles && changes.uploadedFiles.currentValue.length > 0) {
      this.processUploadedFiles();
    }
  }

  onFileChange(files: FileList) {

    if (this.crop) {
      for (let i = 0; i < files.length; i++) {
        const blob = new Blob([files[i]], { type: files[i].type });
        const objectURL = URL.createObjectURL(blob);
        const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.readyToUpload.push({ src: sanitizedUrl, file: blob });
      }
    } else {
      this.onFileChangeAfterCrop(files);
    }
  }

  onFileChangeAfterCrop(files: any, index = null) {
    if (this.disabled) { return; }

    const remainingSlots = this.max - this.fileCounter;
    const filesToUploadNum = files.length > remainingSlots ? remainingSlots : files.length;

    this.fileCounter += filesToUploadNum;
    this.showFileTooLargeMessage = false;

    this.uploadFiles(files, filesToUploadNum, index);
  }

  // onFileOver = (isOver) => this.fileOver = isOver;

  private onResponse(response: HttpResponse<any>, fileHolder: FileHolder) {
    fileHolder.serverResponse = { status: response.status, response };
    fileHolder.pending = false;

    if (--this.pendingFilesCounter === 0) {
      this.triggerChange.emit(this.getProcessedResult());
    }
  }

  private processUploadedFiles() {
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      const fresh = this.uploadedFiles[i];
      const data: any = this.uploadedFiles[i];

      let fileBlob: Blob,
        file: File,
        fileUrl: string;

      if (data instanceof Object) {
        fileUrl = (data.url) ? data.url : data.path;

        fileUrl = (this.pathPrefix) ? this.pathPrefix + fileUrl : fileUrl;
        fileBlob = (data.blob) ? data.blob : new Blob([data]);
        file = new File([fileBlob], data.fileName);
      } else {
        fileUrl = data;
        fileBlob = new Blob([fileUrl]);
        file = new File([fileBlob], fileUrl);
      }
      console.log(file);

      this.files.push(new FileHolder(fileUrl, file, fresh.path, fresh.unique_id, fresh.caption));
      console.log(this.files);

      ++this.fileCounter;
    }
    this.triggerChange.emit(this.getProcessedResult());

  }

  private async uploadFiles(files: any, filesToUploadNum: number, index: number) {
    for (let i = 0; i < filesToUploadNum; i++) {
      const file = files[i];
      console.log(file);

      if (this.maxFileSize && file.size > this.maxFileSize) {
        this.fileCounter--;
        this.inputElement.nativeElement.value = '';
        this.showFileTooLargeMessage = true;
        continue;
      }

      const beforeUploadResult: any = await this.beforeUpload({ file, url: this.url, abort: false });

      if (beforeUploadResult.abort) {
        this.fileCounter--;
        this.inputElement.nativeElement.value = '';
        continue;
      }

      const img = document.createElement('img') as HTMLImageElement;
      img.src = window.URL.createObjectURL(beforeUploadResult.file);

      const reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        const fileHolder: FileHolder = new FileHolder(event.target.result, beforeUploadResult.file, '', '', '');
        this.files.push(fileHolder);
        this.uploadSingleFile(fileHolder, beforeUploadResult.url, beforeUploadResult.formData, index);
      }, false);
      reader.readAsDataURL(beforeUploadResult.file);
    }
  }

  private uploadSingleFile(fileHolder: FileHolder, url = this.url, customForm?: { [name: string]: any }, i = null) {
    if (url) {
      this.pendingFilesCounter++;
      fileHolder.pending = true;

      this.imageService
        .uploadImage(url, fileHolder.file, this.partName, customForm)
        .subscribe(
          response => {
            if (i !== null) {
              this.readyToUpload.splice(i, 1);
            }
            return this.onResponse(response, fileHolder);
          },
          error => {
            this.onResponse(error, fileHolder);
            this.deleteFile(fileHolder);
          });
    } else {
      this.triggerChange.emit(this.getProcessedResult());
    }
  }

  getProcessedResult() {
    return this.files.map((file, index) => {
      let path = '';
      if (file.path) {
        path = file.path;
      } else {
        path = (file.serverResponse) ? file.serverResponse.response.body.data.url : '';
      }
      return { sort_order: (index + 1), type: 1, caption: (file.caption) ? file.caption : '', path, unique_id: path };
    });
  }

  openUploadImageDialog(blobFile, i) {

    const dialogRef = this.dialog.open(ImageComponentComponent, {
      width: '600px',
      data: { file: blobFile, aspectRatio: this.aspectRatio, format: this.format }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        let fileBlob: Blob,
          file: File,
          fileUrl: string;

        if (data instanceof Object) {
          fileUrl = (data.url) ? data.url : data.path;

          fileUrl = (this.pathPrefix) ? this.pathPrefix + fileUrl : fileUrl;
          fileBlob = (data.blob) ? data.blob : new Blob([data]);
          file = new File([fileBlob], data.fileName);
        } else {
          fileUrl = data;
          fileBlob = new Blob([fileUrl]);
          file = new File([fileBlob], fileUrl);
        }
        this.onFileChangeAfterCrop([file], i);
      }
    });
  }

  deletePendingFile(index) {
    this.readyToUpload.splice(index, 1);
  }


  addDropItem(sourceValue, destValue) {
    if (sourceValue.src === destValue.src) {
      return;
    }
    const srcPos = this.files.map(function (e) { return e.src; }).indexOf(sourceValue.src);
    const destPos = this.files.map(function (e) { return e.src; }).indexOf(destValue.src);

    this.files[srcPos] = destValue;
    this.files[destPos] = sourceValue;
    this.destFile = null;

    this.triggerChange.emit(this.getProcessedResult());
  }

  drop($event) {
    if ($event.currentIndex === $event.previousIndex) {
      return;
    }
    const srcFile = this.files[$event.currentIndex];
    const desFile = this.files[$event.previousIndex];

    this.files[$event.currentIndex] = desFile;
    this.files[$event.previousIndex] = srcFile;
    this.destFile = null;

    this.triggerChange.emit(this.getProcessedResult());
  }
}
