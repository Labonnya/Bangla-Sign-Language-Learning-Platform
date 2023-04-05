import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  title: string = '';
  description: string = '';
  vdesc: string = '';
  videoUrl: string = '';

  constructor(private http: HttpClient) { }

  setFormData(title: string, description: string, vdesc: string, videoUrl: string): void {
    this.title = title;
    this.description = description;
    this.vdesc = vdesc;
    this.videoUrl = videoUrl;
  }

  getFormData(): any {
    return {
      title: this.title,
      description: this.description,
      vdesc: this.vdesc,
      videoUrl: this.videoUrl
    };
  }
  private baseUrl = 'http://localhost:8000';

  fetchVideoData(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/fetch_video_data');
  }
  deleteCourse(title: string) {
    return this.http.delete(`${this.baseUrl}/delete_course?titleVideo=${title}`);
  }
  
}
