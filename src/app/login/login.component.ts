import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ConstantService } from '../services/constant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginStatus: string = '';
  username: string = '';
  password: string = '';

  constructor(private router : Router, private constants: ConstantService){}

  authenticate(){
    let url = this.constants.getIpAddres() + "/login/";
    let data = {
        "username": this.username,
        "password": this.password
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
      console.log("Login Data:"+data);
      if(data=="WRONG_LOGIN_CREDENTIALS"){
        this.router.navigate(['invalid-credentials']);
      }else{
        sessionStorage.setItem("username", this.username);
        sessionStorage.setItem("role", data["role"]);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("institution", data.institution);
        sessionStorage.setItem("authToken", data.authToken);

        this.loginStatus = data.Status;

        this.router.navigate(['menu']);
      }
    })
    .catch((err)=>{
      console.log(err);
    });
  console.log("Login Status: "+this.loginStatus);
  }
}