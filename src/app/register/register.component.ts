import { Component, ElementRef, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ConstantService } from '../services/constant.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = '';
  password: string = '';
  role: string = "Teacher";
  email: string = '';
  institution: string = '';

  OTPSent: boolean = false;

  constructor(private router: Router, private constants: ConstantService){}
  
  registerUser(): void{
    this.constants.FORGOT_PASSWORD_PROCESS = false;
    let url = this.constants.getIpAddres() + "/register/";
    let data = {
        "username": this.username,
        "password": this.password,
        "role": this.role,
        "email": this.email,
        "institution": this.institution
    }

    console.log(data);
    fetch(url, {
        method: "POST",mode: "cors", cache: "no-cache", credentials: "same-origin", 
        headers: {
        "Content-Type": "application/json",
        },
        redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(data), 
    })
    .then((resolve)=>{
        console.log("Registration Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        console.log("User Registration Response: "+data.toString());
        sessionStorage.setItem("username", this.username);
        sessionStorage.setItem("password", this.password);
        sessionStorage.setItem("role", this.role);
        sessionStorage.setItem("email", this.email);
        sessionStorage.setItem("institution", this.institution);
        this.router.navigate(['/otp-verification/']);
    })
    .catch((err)=>{
      console.log(err);
    });
    

  }
}
