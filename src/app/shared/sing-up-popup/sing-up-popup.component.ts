import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sing-up-popup',
  templateUrl: './sing-up-popup.component.html',
  styleUrls: ['./sing-up-popup.component.scss']
})


export class SingUpPopupComponent implements OnInit {
  LodingPopup: boolean = false;
  redirectUrl: string = '';
  username: string = '';
  useremail: string = '';
  users: any;
  otpsent = false;
  verfyotp = false;
  register = false;
  sendotp: any = {}
  verifyotp: any = {}
  errormsg: any
  showmobilenumber: any
  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.otpsent = true;
    this.verfyotp = false;
    this.register = false;
  }

  onSendOtp(mobilenumber: any) {
    if (mobilenumber == '') {
      this.errormsg = "Mobile Number is required";
    } else {
      this.loginService.sendotp(mobilenumber).subscribe((data) => {
        this.sendotp = data;
        localStorage.setItem('mobilenumber', mobilenumber);
        this.showmobilenumber = localStorage.getItem("mobilenumber");
        if (this.sendotp.checkuser === true) {
          if (this.sendotp.status === true) {
            this.otpsent = false;
            this.verfyotp = true;
            this.register = false;
          } else {
            this.errormsg = "Invalid Mobile Number Check Your Number";
            localStorage.setItem('mobilenumber', '');
            localStorage.removeItem('mobilenumber');
          }
        } else {
          if (this.sendotp.status === true) {
            this.otpsent = false;
            this.verfyotp = false;
            this.register = true;
          } else {
            this.errormsg = "Invalid Mobile Number Check Your Number";
            localStorage.setItem('mobilenumber', '');
            localStorage.removeItem('mobilenumber');
          }
        }
      });
    }
  }

  onVerifyOtp(otp: any) {
    if (otp.length === 4) {
      this.loginService.verifyotp(otp).subscribe((data) => {
        this.verifyotp = data;
        if (this.verifyotp.status === true) {
          if (this.verifyotp.data.token.token != '') {
            localStorage.setItem('token', this.verifyotp.data.token.token);
            localStorage.setItem('UserName', this.verifyotp.data.full_name);
            localStorage.setItem('CurrentBalance', this.verifyotp.wallet_balance[0].balance);
            // this.router.navigate([]);
            window.location.reload();
          } else {
            localStorage.setItem('token', '');
            localStorage.setItem('UserName', '');
            localStorage.setItem('CurrentBalance', '');
            // localStorage.clear();
            localStorage.removeItem('token');
            localStorage.removeItem('UserName');
            localStorage.removeItem('CurrentBalance');
            window.location.reload();
          }
        } else {
          this.errormsg = "Incorrect OTP";
        }
      });
    } else {
      this.errormsg = "Incorrect OTP format";
    }
  }

  signupwithotp(otp: any) {
    this.username = (<HTMLInputElement>document.getElementById("username")).value;
    this.useremail = (<HTMLInputElement>document.getElementById("email")).value;
    if (otp.length === 4) {
      this.loginService.signup(otp, this.username, this.useremail).subscribe((data) => {
        this.verifyotp = data;
        if (this.verifyotp.status === true) {
          if (this.verifyotp.data.token.token != '') {
            localStorage.setItem('token', this.verifyotp.data.token.token);
            localStorage.setItem('UserName', this.verifyotp.data.full_name);
            this.router.navigate([]);
          } else {
            localStorage.setItem('token', '');
            localStorage.setItem('UserName', '');
            localStorage.removeItem('token');
            localStorage.removeItem('UserName');
            // localStorage.clear();
            // this.router.navigate([]);
            window.location.reload();
          }
        } else {
          this.errormsg = "Incorrect OTP";
        }
      });
    } else {
      this.errormsg = "Incorrect OTP format";
    }
  }


}


