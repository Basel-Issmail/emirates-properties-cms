import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploaderService {
  constructor(private http: HttpClient) {
  }

  public uploadImage(url: string,
    image: File,
    partName: string = 'photo',
    customFormData?: { [header: string]: string | Blob }
  ): Observable<HttpResponse<any>> {
    if (!url || url === '') {
      throw new Error('Url is not set! Please set it before doing queries');
    }

    const formData = new FormData();

    if (customFormData) {
      for (const key of Object.keys(customFormData)) {
        formData.append(key, customFormData[key]);
      }
    }

    formData.append(partName, image);

    return this.http.post(url, formData, { observe: 'response' });
  }
}
