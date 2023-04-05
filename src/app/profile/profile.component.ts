import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantService } from '../services/constant.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  username: string | null = sessionStorage.getItem("username");
  role: string | null = sessionStorage.getItem("role");
  email: string | null = sessionStorage.getItem("email");
  institution:string | null = sessionStorage.getItem("institution");

  constructor(private router: Router, private constants: ConstantService){}

  logout(): void{
    let myurl = this.constants.getIpAddres() + "/logout/";
    let data = {
        "authToken": sessionStorage.getItem("authToken"),
    }

    console.log(data);
    fetch(myurl, {
        method: "POST",mode: "cors", cache: "no-cache", credentials: "same-origin", 
        headers: {
        "Content-Type": "application/json",
        },
        redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(data), 
    })
    .then((resolve)=>{
        console.log("Logout Request has been resolved!");
        return resolve.json()
    })
    .then((data)=>{
        console.log("LOGOUT STATUS: "+data.Status);
        sessionStorage.clear();
        this.router.navigate(["home"]);
    })
    .catch((err)=>{
      console.log(err);
    });
  }
}