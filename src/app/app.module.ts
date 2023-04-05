import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { VideoListComponent } from './video-list/video-list.component';
import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';
import { faPlusSquare, faEdit, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { EditFormComponent } from './edit-form/edit-form.component';
import { ShowWordsPipe } from './video-list/show-words.pipe';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { RegisterComponent } from './register/register.component';

import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InvalidCredentialsComponent } from './login/invalid-credentials/invalid-credentials.component';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HomeComponent,
    MenuComponent,
    VideoListComponent,
    EditFormComponent,
    ShowWordsPipe,
    CourseDetailsComponent,
    ViewTeacherComponent,
    RegisterComponent,
    OtpVerificationComponent,
    TeacherDashboardComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    InvalidCredentialsComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faPlusSquare);
    library.addIcons(faEdit);
    library.addIcons(faListCheck);
  }
 }
