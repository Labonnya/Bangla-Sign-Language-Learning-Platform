import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})

export class VideoListComponent implements OnInit {
  videos: any[] = [];

  constructor(private formDataService: FormDataService, private router: Router) { }

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
}
