import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormDataService } from '../form-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent {
  title: string = '';
  description: string = '';
  vdesc: string = '';
  video: string = '';
  showVideoForm: boolean = false;

  constructor(
    private router: Router,
    private formDataService: FormDataService,
    private http: HttpClient
  ) {}

  onSubmit() {
    this.formDataService.title = this.title;
    this.formDataService.description = this.description;
    this.formDataService.vdesc = this.vdesc;
    this.formDataService.videoUrl = this.video;
    this.http.post('http://localhost:8000/edit_form', this.formDataService).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['']);
  }

  addVideo() {
    this.showVideoForm = true;
  }

  onVideoSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.video = reader.result as string;
        this.formDataService.videoUrl = this.video;
      };
    }
  }
}
