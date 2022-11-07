import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AstrologerlistService } from "../../services/astrologerlist.service";

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
  astrodetails: any = [];
  forcallchat: any;
  users: any;
  otpsent = false;
  verfyotp = false;
  register = false;
  astrocard_otpsent: boolean = false;
  astrocard_verfyotp: boolean = false;
  astrocard_register: boolean = false;
  sendotp: any = {};
  verifyotp: any = {};
  errormsg: any;
  showmobilenumber: any = '';
  timeLeft: number = 60;
  interval: any;
  otperror: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private loginService: LoginService, private router: Router, private formBuilder: FormBuilder, public astrologerlistService: AstrologerlistService) {
  }

  ngOnInit(): void {
    this.otpsent = true;
    this.verfyotp = false;
    this.register = false;

    this.forcallchat = this.data.astroIdforcall; //astrologer Id for call
    if (this.forcallchat != null) {
      this.astrocard_otpsent = true;
      this.otpsent = false;
      this.verfyotp = false;
      this.register = false;
      this.astrologerlistService.astrodetailspopup(this.data.astroIdforcall).subscribe((data: any) => {
        this.astrodetails = data;
      }); 
    } else {
      this.astrocard_otpsent = false;
      this.otpsent = true;
      this.verfyotp = false;
      this.register = false;
    }
  }

  ///////////Header---Login////////////
  onSendOtp(mobilenumber: any) {
    if (mobilenumber == '') {
      this.errormsg = "Mobile Number is required";
    } else {
      this.loginService.sendotp(mobilenumber).subscribe((data: any) => {
        this.sendotp = data;
        localStorage.setItem('mobilenumber', mobilenumber);
        this.showmobilenumber = localStorage.getItem("mobilenumber");
        if (this.sendotp.checkuser === true) {
          if (this.sendotp.status === true) {
            this.otpsent = false;
            this.verfyotp = true;
            this.register = false;
            this.startTimer();
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
      this.loginService.verifyotp(otp).subscribe((data: any) => {
        this.verifyotp = data;
        if (this.verifyotp.status === true) {
          if (this.verifyotp.data.token.token != '') {
            localStorage.setItem('token', this.verifyotp.data.token);
            localStorage.setItem('UserName', this.verifyotp.data.full_name);
            localStorage.setItem('userPhoto', this.verifyotp.data.image);
            // localStorage.setItem('CurrentBalance', this.verifyotp.wallet_balance[0].balance);
            // this.router.navigate([]);
            
            window.location.reload();
          } else {
            localStorage.setItem('token', '');
            localStorage.setItem('UserName', '');
            // localStorage.setItem('CurrentBalance', '');
            // localStorage.clear();
            localStorage.removeItem('token');
            localStorage.removeItem('UserName');
            localStorage.removeItem('userPhoto');
            // localStorage.removeItem('CurrentBalance');
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
      this.loginService.signup(otp, this.username, this.useremail).subscribe((data: any) => {
        this.verifyotp = data;
        if (this.verifyotp.status === true) {
          if (this.verifyotp.data[0].token != '') {
            localStorage.setItem('token', this.verifyotp.data[0].token);
            localStorage.setItem('UserName', this.verifyotp.data[0].full_name);
            // this.router.navigate([]);
            window.location.reload();
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
  /////////End Header--------Login///////////

  editnumber() {
    this.verfyotp = false;
    this.otpsent = true;
  }

  astrocard_editnumber() {
    this.astrocard_verfyotp = false;
    this.astrocard_otpsent = true;
  }

  resendotp() {
    alert(localStorage.getItem('mobilenumber'));
  }

  startTimer() {
    this.otperror = false;
    this.otpsent = false;
    this.verfyotp = true;
    this.register = false;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
        this.pauseTimer();
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.otperror = true;
  }


  ////////Astrocard-------Login////////////
  astrocard_onSendOtp(mobilenumber: any) {
    if (mobilenumber == '') {
      this.errormsg = "Mobile Number is required";
    } else {
      this.loginService.sendotp(mobilenumber).subscribe((data: any) => {
        this.sendotp = data;
        localStorage.setItem('mobilenumber', mobilenumber);
        this.showmobilenumber = localStorage.getItem("mobilenumber");
        if (this.sendotp.checkuser === true) {
          if (this.sendotp.status === true) {
            this.astrocard_otpsent = false;
            this.astrocard_verfyotp = true;
            this.astrocard_register = false;
            this.astrocard_startTimer();
          } else {
            this.errormsg = "Invalid Mobile Number Check Your Number";
            localStorage.setItem('mobilenumber', '');
            localStorage.removeItem('mobilenumber');
          }
        } else {
          if (this.sendotp.status === true) {
            this.astrocard_otpsent = false;
            this.astrocard_verfyotp = false;
            this.astrocard_register = true;
            this.astrocard_startTimerregister();
          } else {
            this.errormsg = "Invalid Mobile Number Check Your Number";
            localStorage.setItem('mobilenumber', '');
            localStorage.removeItem('mobilenumber');
          }
        }
      });
    }
  }

  astrocard_onVerifyOtp(otp: any) {
    if (otp.length === 4) {
      this.loginService.verifyotp(otp).subscribe((data: any) => {
        this.verifyotp = data;
        if (this.verifyotp.status === true) {
          if (this.verifyotp.data.token.token != '') {
            localStorage.setItem('token', this.verifyotp.data.token.token);
            localStorage.setItem('UserName', this.verifyotp.data.full_name);
            // localStorage.setItem('CurrentBalance', this.verifyotp.wallet_balance[0].balance);
            // this.router.navigate([]);
            window.location.reload();
          } else {
            localStorage.setItem('token', '');
            localStorage.setItem('UserName', '');
            // localStorage.setItem('CurrentBalance', '');
            // localStorage.clear();
            localStorage.removeItem('token');
            localStorage.removeItem('UserName');
            // localStorage.removeItem('CurrentBalance');
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

  astrocard_startTimer() {
    this.otperror = false;
    this.astrocard_otpsent = false;
    this.astrocard_verfyotp = true;
    this.astrocard_register = false;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
        this.pauseTimer();
      }
    }, 1000)
  }

  astrocard_startTimerregister() {
    this.otperror = false;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
        this.pauseTimer();
      }
    }, 1000)
  }

  astrocard_signupwithotp(otp: any) {
    this.username = (<HTMLInputElement>document.getElementById("astrocard_username")).value;
    this.useremail = (<HTMLInputElement>document.getElementById("astrocard_email")).value;
    if (otp.length === 4) {
      this.loginService.signup(otp, this.username, this.useremail).subscribe((data: any) => {
        this.verifyotp = data;
        if (this.verifyotp.status === true) {
          if (this.verifyotp.data[0].token != '') {
            localStorage.setItem('token', this.verifyotp.data[0].token);
            localStorage.setItem('UserName', this.verifyotp.data[0].full_name);
            // this.router.navigate([]);
            window.location.reload();
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

  onDigitInput(event: any){

    let element;
    if (event.code !== 'Backspace')
         element = event.srcElement.nextElementSibling;
 
     if (event.code === 'Backspace')
         element = event.srcElement.previousElementSibling;
 
     if(element == null)
         return;
     else
         element.focus();
 }

}


