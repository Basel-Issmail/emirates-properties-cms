import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'ep-image-component',
  templateUrl: './image-component.component.html',
  styleUrls: ['./image-component.component.scss']
})
export class ImageComponentComponent implements OnInit {

  @Output('imageUrl') imageUrl = new EventEmitter();
  @Input() width = 0;
  imageChangedEvent: any = null;
  croppedImage: ImageCroppedEvent = null;
  progressValue: number;
  aspectRatio = 4 / 3;
  format = 'jpeg';

  constructor(private http: HttpClient,
    public dialogRef: MatDialogRef<ImageComponentComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.imageChangedEvent = data['file'];
    this.aspectRatio = data['aspectRatio'];
    this.format = data['format'];

    console.log(this.imageChangedEvent);
    
  }

  ngOnInit() {
  }

  onUpload() {
    if (!this.croppedImage) {
      return;
    }
    console.log(this.croppedImage);

    this.dialogRef.close(this.convertBase64ToBlob(this.croppedImage.base64));
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event;
  }

  imageLoaded() {
    // show cropper
  }

  loadImageFailed() {
    // show message
  }

  /**
 * Convert BASE64 to BLOB
 * @param base64Image Pass Base64 image data to convert into the BLOB
 */
  private convertBase64ToBlob(base64Image: string) {
    // Split into two parts
    const parts = base64Image.split(';base64,');

    // Hold the content type
    const imageType = parts[0].split(':')[1];

    // Decode Base64 string
    const decodedData = window.atob(parts[1]);

    // Create UNIT8ARRAY of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);

    // Insert all character code into uInt8Array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }

    // Return BLOB image after conversion
    return new Blob([uInt8Array], { type: imageType });
  }
}
