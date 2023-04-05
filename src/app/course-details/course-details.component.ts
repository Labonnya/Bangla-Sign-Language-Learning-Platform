import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  videos: any[] = [];

  constructor(private formDataService: FormDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const title = params['title'];
      console.log('Course:', title);
    });
    this.fetchVideoData();
  }

  fetchVideoData(): void {
    this.formDataService.fetchVideoData().subscribe(
      (response) => {
        const title = this.route.snapshot.paramMap.get('title');
        this.videos = response.data.filter((video: any) => video[0] === title);
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

  showMore(index: number): void {
    const video = this.videos[index];
    video.showFullDescription = true;
  }  

  showLess(index: number): void {
    const video = this.videos[index];
    video.showFullDescription = false;
  }  
}
