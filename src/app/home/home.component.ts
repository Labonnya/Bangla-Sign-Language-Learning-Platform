import { Component } from '@angular/core';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  formData: any;

  constructor(private formDataService: FormDataService) { }

  ngOnInit(): void {
    this.formDataService.fetchVideoData();
    this.formData = this.formDataService.getFormData();
  }
}
