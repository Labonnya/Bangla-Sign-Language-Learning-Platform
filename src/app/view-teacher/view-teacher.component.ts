import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from '../form-data.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.css']
})
export class ViewTeacherComponent implements OnInit {
  videos: any[] = [];

  constructor(private formDataService: FormDataService, private router: Router, private http: HttpClient, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchVideoData();
  }

  fetchVideoData(): void {
    this.formDataService.fetchVideoData().subscribe(
      (response) => {
        this.videos = response.data;
        console.log(this.videos)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showDetails(index: number): void {
    const video = this.videos[index];
    video.showDetails = !video.showDetails;
  }

  goCourse(courseTitle: string): void {
    if (courseTitle) {
      this.router.navigate(['/course-details', courseTitle]);
    }
  }

  showMore(index: number): void {
    const video = this.videos[index];
    video.showFullDescription = true;
  }  

  showLess(index: number): void {
    const video = this.videos[index];
    video.showFullDescription = false;
  }  

  onDelete(title: string) {
    
    this.formDataService.deleteCourse(title).subscribe(response => {
      this.videos = this.videos.filter(video => video.title !== title);
      this.cdRef.detectChanges(); // manually detect changes
      this.router.navigate(['/viewVideo']);
      
    });

  }
  
}
