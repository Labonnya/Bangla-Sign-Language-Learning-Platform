import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantService } from '../services/constant.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  submitted_mail: string = '';

  constructor(private router: Router, private constants: ConstantService){}

  startForgetPasswordProcess(): void{
    this.constants.FORGOT_PASSWORD_PROCESS = true;
    let url = this.constants.getIpAddres() + "/login/forgot_password/";
    let data = {
        "email": this.submitted_mail,
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
        return resolve.json()
    })
    .then((data)=>{
        sessionStorage.setItem("email", this.submitted_mail);
        this.router.navigate(['otp-verification']);
    })
    .catch((err)=>{
      console.log(err);
    });
  }
}
