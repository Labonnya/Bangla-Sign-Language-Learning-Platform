import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor() { }

  ip_addr = "http://127.0.0.1:8000";
  FORGOT_PASSWORD_PROCESS:boolean = false;

  getIpAddres(): string{
    return this.ip_addr;
  }
}
