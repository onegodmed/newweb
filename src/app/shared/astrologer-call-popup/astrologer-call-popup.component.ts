import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Inject } from '@angular/core';
import { AstrologerlistService } from "../../services/astrologerlist.service";
import { UserService } from "../../services/user.service";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-astrologer-call-popup',
  templateUrl: './astrologer-call-popup.component.html',
  styleUrls: ['./astrologer-call-popup.component.scss']
})
export class AstrologerCallPopupComponent implements OnInit {

  selected = 'Gender';
  astrodetails: any = [];
  checkuserbalance: any = [];
  time = { hour: 13, minute: 30, second: 0 };
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;
  show: boolean = true;
  hide: boolean = false;
  showchatmodal: boolean = false;
  showcallmodal: boolean = false;
  walletbalancepopup: boolean = false;
  chatsectionpopup: boolean = false;
  callsectionpopup: boolean = false;
  chatwaitingscreenpopup: boolean = false;
  callwaitingscreenpopup: boolean = false;
  oopsscreenpopup: boolean = false;
  chatform: any = [];
  getcities: any = [];
  callApiresponse: any = [];
  selectedcityname: any;
  forchat: any;
  forcall: any;
  usermobilenumber: any;
  timeLeft: number = 10;
  interval: any;
  errormessageforfullname: any = '';
  errormessageforbirthplace: any = '';
  userId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public astrologerlistService: AstrologerlistService, public userService: UserService) { }

  ngOnInit(): void {

    this.forcall = this.data.astroIdforcall; //astrologer Id for call
    this.forchat = this.data.astroIdforchat; //astrologer Id for chat

    if (localStorage.getItem('token') != null) {
      this.userService.userWalletdetails().subscribe((data: any) => {
        this.userId = data;
      });
    } else {
      this.userId = '';
    }

    if (localStorage.getItem('token') != null) {
      this.usermobilenumber = localStorage.getItem('mobilenumber');
    } else {
      this.usermobilenumber = '';
    }

    //START FOR CALL///
    if (this.forcall != null) {
      this.showcallmodal = true;
      this.astrologerlistService.astrodetailspopup(this.data.astroIdforcall).subscribe((data: any) => {
        this.astrodetails = data;
        console.log(this.astrodetails);
      });

      this.userService.checkuserbalance(this.data.astroIdforcall).subscribe((data: any) => {
        this.checkuserbalance = data;
        if (this.checkuserbalance.status === false) {
          this.walletbalancepopup = true;
        } else {
          this.walletbalancepopup = false;
          this.callsectionpopup = true;
        }
      });

    } else {
      this.showcallmodal = false;
    }
    /// END FOR CHAT ////
    //START FOR CHAT///
    if (this.forchat != null) {
      this.showchatmodal = true;
      this.walletbalancepopup = true;

      this.astrologerlistService.astrodetailspopup(this.data.astroIdforchat).subscribe((data: any) => {
        this.astrodetails = data;
      });

      this.userService.checkuserbalance(this.data.astroIdforchat).subscribe((data: any) => {
        this.checkuserbalance = data;
        if (this.checkuserbalance.status === false) {
          this.walletbalancepopup = true;
        } else {
          this.walletbalancepopup = false;
          this.chatsectionpopup = true;
        }
      });

    } else {
      this.showchatmodal = false;
      this.walletbalancepopup = true;
    }
    /// END FOR CHAT ////
  }

  // proceedtochat() {
  //   this.walletbalancepopup = false;
  //   this.chatsectionpopup = true;
  // }

  // proceedtocall() {
  //   this.callsectionpopup = false;
  //   this.callwaitingscreenpopup = true;
  // }

  proceedtorecharge() {
    window.location.href = 'wallet';
  }

  chatnow() {
    this.chatform = [
      {
        fullname: (<HTMLInputElement>document.getElementById("fullname")).value,
        gender: (<HTMLInputElement>document.getElementById("gender")).value,
        dob: (<HTMLInputElement>document.getElementById("day")).value + '/' + (<HTMLInputElement>document.getElementById("months")).value + '/' + (<HTMLInputElement>document.getElementById("Year")).value,
        birthtime: (<HTMLInputElement>document.getElementById("hour")).value + ':' + (<HTMLInputElement>document.getElementById("minute")).value + ' ' + (<HTMLInputElement>document.getElementById("am")).value,
        birthplace: (<HTMLInputElement>document.getElementById("searchcity")).value
      }
    ];
    if (this.chatform[0].fullname == '') {
      this.errormessageforfullname = 'Full Name is Required!'
      this.flash();
    } else if (this.chatform[0].birthplace == '') {
      this.errormessageforbirthplace = 'Birth Place is required!'
      this.flash();
    } else {
      this.startTimerforchat();
      this.chatsectionpopup = false;
      this.chatwaitingscreenpopup = true;
    }
    // console.log(this.chatform);

  }

  callnow() {
    // this.userService.addCall(this.userId.data.user_id,this.forcall).subscribe((data: any) => {
    //   this.callApiresponse = data;
    //   console.log(this.callApiresponse);
    // });
    this.startTimerforcall();
    this.callsectionpopup = false;
    this.callwaitingscreenpopup = true;
    // this.callwaitingscreenpopup = true;
  }

  getCity() {
    let search = (<HTMLInputElement>document.getElementById("searchcity")).value;
    if (search.length >= 3) {
      this.userService.getCity(search).subscribe((data: any) => {
        this.getcities = data;
      });
    }
  }

  selectcity(cityname: any = []) {
    if (this.getcities != '') {
      this.selectedcityname = cityname;
      this.getcities = null;
    }
  }

  startTimerforcall() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
        this.pauseTimerforcall();
      }
    }, 1000)
  }

  startTimerforchat() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
        this.pauseTimerforchat();
      }
    }, 1000)
  }

  pauseTimerforcall() {
    clearInterval(this.interval);
    this.callwaitingscreenpopup = false;
    this.oopsscreenpopup = true;
  }

  pauseTimerforchat() {
    clearInterval(this.interval);
    this.chatwaitingscreenpopup = false;
    this.oopsscreenpopup = true;
  }

  flash(){
    setTimeout(()=>{
      this.errormessageforfullname = '';
      this.errormessageforbirthplace = '';
    },3000);
  }

}
