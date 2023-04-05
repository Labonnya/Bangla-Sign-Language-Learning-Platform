import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantService } from '../services/constant.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  submitted_otp = ''
  FORGOT_PASSWORD_PROCESS: boolean = false;
  new_password = ''

  ngOnInit(): void{
    this.FORGOT_PASSWORD_PROCESS = this.constants.FORGOT_PASSWORD_PROCESS;
  }

  constructor(private constants: ConstantService, private router: Router){}

  verifySubmittedOTP(): void{
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");
    const role = sessionStorage.getItem("role");
    const email = sessionStorage.getItem("email");
    const institution = sessionStorage.getItem("institution");

    let url = null;
    if(this.FORGOT_PASSWORD_PROCESS==true) url = this.constants.getIpAddres() + "/login/forgot_password/OTP";
    else url = this.constants.getIpAddres() + "/register/OTP";

    let data = {
        "username": username,
        "password": password,
        "role": role,
        "email": email,
        "institution": institution,
        "OTP": this.submitted_otp,
        "new_password": this.new_password
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
      if(data=="FORGOT_PASSWORD_OPERATION_FAILED" || data=="WRONG_OTP"){
        this.router.navigate(['invalid-credentials']);
      }
      else {
        console.log("User Registration OTP Verification Response: "+data.authToken);
        sessionStorage.setItem("authToken", data.authToken);
        sessionStorage.setItem("OTP", this.submitted_otp);
        if(this.FORGOT_PASSWORD_PROCESS==false) this.router.navigate(['teacher-dashboard']);
        else this.router.navigate(['login']);
      }
    })
    .catch((err)=>{
      console.log(err);
    });
  }
}
