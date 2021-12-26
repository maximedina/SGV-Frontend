import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
private baseUrl = environment.COREAPIURL + '/UploadImage';
constructor(private http: HttpClient) {}

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  uploadImage(hash, file : File): Observable<any> {
      let formData = new FormData();
      const fileToUpload = <File>file;
      formData.append('file', fileToUpload, hash);
    return this.http.post<any>(`${this.baseUrl}/uploadImage`, formData);
  }

}
