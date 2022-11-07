import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
//import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { Inject } from '@angular/core';
import { AstrologerlistService } from "../../services/astrologerlist.service";
import { UserService } from "../../services/user.service";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RatingsService } from 'src/app/services/ratings.service';
import { OrderService } from 'src/app/services/order.service';
//import { SocketService } from 'src/app/services/socket.service';


@Component({
  selector: 'app-astrologer-call-popup',
  templateUrl: './astrologer-call-popup.component.html',
  styleUrls: ['./astrologer-call-popup.component.scss']
})
export class AstrologerCallPopupComponent implements OnInit {

  selected = 'Gender';
  astrodetails: any = [];
  reviewratingdata: any = [];
  checkuserbalance: any = [];
  hide: boolean = false;
  busy: boolean = false;
  showchatmodal: boolean = false;
  showendchatmodal: boolean = false;
  showratingreviewmodalchat: boolean = false;
  showratingreviewmodalcall: boolean = false;
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
  chatApiresponse: any = [];
  selectedcityname: any;
  forchat: any;
  forcall: any;
  usermobilenumber: any;
  timeLeft: number = 0;
  interval: any;
  errormessageforfullname: any = '';
  errormessageforgender:any='';
  errormessagefordob:any='';
  errormessageforbirthplace: any = '';
  userId: any;
  forendchat: any;
  forratingreview: any;
  ratingsonly: any;
  reviewsonly: any;
  ratingreviewmsg: any;
  display: any;
  callId: any;
  statusMessage: any = 'Ringing';
  callMissed = false
  showStatuswindow = false





  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    //private socketService: SocketService,
    public astrologerlistService: AstrologerlistService,
    public userService: UserService,
    public ratingsService: RatingsService,
    public orderService: OrderService) { }

  ngOnInit(): void {

    this.forcall = this.data.astroIdforcall; //astrologer Id for call
    this.forchat = this.data.astroIdforchat; //astrologer Id for chat
    this.forendchat = this.data.order_id; //order Id for EndChat
    this.forratingreview = this.data.astrologerId_forratingreview; //order Id for Rating and Review

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
      });

      this.userService.checkuserbalance(this.data.astroIdforcall).subscribe((data: any) => {
        this.checkuserbalance = data;
        console.log(this.checkuserbalance);
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
    /// END FOR CALL ////



    //START FOR CHAT///
    if (this.forchat != null) {
      this.showchatmodal = true;
      this.walletbalancepopup = true;

      this.astrologerlistService.astrodetailspopup(this.data.astroIdforchat).subscribe((data: any) => {
        this.astrodetails = data;
      });

      this.userService.checkuserbalance(this.forchat).subscribe((data: any) => {
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

    if (this.forendchat != null) {
      this.showchatmodal = true;
      this.walletbalancepopup = false;
      this.showendchatmodal = true;

      this.astrologerlistService.astrodetailspopup(this.data.astroId_endchat).subscribe((data: any) => {
        this.astrodetails = data;
      });

    } else {
      // this.showchatmodal = false;
      this.showendchatmodal = false;
    }

    if (this.forratingreview != null) {
      this.showchatmodal = true;
      this.walletbalancepopup = false;
      this.showratingreviewmodalchat = true;

      this.astrologerlistService.astrodetailspopup(this.data.astrologerId_forratingreview).subscribe((data: any) => {
        this.astrodetails = data;
      });

    } else {
      // this.showchatmodal = false;
      this.showratingreviewmodalchat = false;
    }
    /// END FOR CHAT ////
  }

  proceedtorecharge() {
    window.location.href = 'wallet';
  }

  chatnow() {
    this.chatform = [
      {
        fullname: (<HTMLInputElement>document.getElementById("fullname")).value,
        gender: (<HTMLInputElement>document.getElementById("gender")).value,
        dob: (<HTMLInputElement>document.getElementById("day")).value + '/' + (<HTMLInputElement>document.getElementById("months")).value + '/' + (<HTMLInputElement>document.getElementById("Year")).value,

        d:(<HTMLInputElement>document.getElementById("day")).value,
        o:(<HTMLInputElement>document.getElementById("months")).value,
        b:(<HTMLInputElement>document.getElementById("Year")).value,
        birthtime: (<HTMLInputElement>document.getElementById("hour")).value + ':' + (<HTMLInputElement>document.getElementById("minute")).value + ' ' + (<HTMLInputElement>document.getElementById("am")).value,
        birthTime: (<HTMLInputElement>document.getElementById("hour")).value + ':' + (<HTMLInputElement>document.getElementById("minute")).value,
        birthplace: (<HTMLInputElement>document.getElementById("searchcity")).value
      }
    ];

    if (this.chatform[0].fullname == '') {
      this.errormessageforfullname = 'Full Name is Required!'
      this.flash();
    }else if (this.chatform[0].gender == '' || this.chatform[0].gender == 'Gender') {
      this.errormessageforgender = 'Gender is required!'
      this.flash();
    }
    // else if (this.chatform[0].dob == 'day/months/Year' || this.chatform[0].dob == '') {
    //   this.errormessagefordob = 'Date of Birth is required!'
    //   this.flash();
    // }
    else if (this.chatform[0].d == 'day' || this.chatform[0].d == '') {
      this.errormessagefordob = 'Date of Birth is required!'
      this.flash();
    }
    else if (this.chatform[0].o == 'months' || this.chatform[0].o == '') {
      this.errormessagefordob = 'Date of Birth is required!'
      this.flash();
    }
    else if (this.chatform[0].b == 'Year' || this.chatform[0].b == '') {
      this.errormessagefordob = 'Date of Birth is required!'
      this.flash();
    }

    else if (this.chatform[0].birthtime == '' || this.chatform[0].birthtime == 'Hour:Minute am') {
      this.errormessageforbirthplace = 'birth time is required!'
      this.flash();
    }else if (this.chatform[0].birthplace == '') {
      this.errormessageforbirthplace = 'Birth Place is required!'
      this.flash();
    }else {
      this.userService.addChat(this.userId.data.user_id, this.forchat, this.chatform).subscribe((data: any) => {
        this.chatApiresponse = data;

        // if(data.status){
        //   const messageStr  = "Name: "+this.chatform[0].fullname+" Gender: "+this.chatform[0].fullname+" DOB: "+this.chatform[0].dob+" Birth Place: "+this.chatform[0].birthplace+ " Birth Time: "+   moment(this.chatform[0].birthtime).format('hh:mm');
        //   const  roomId   = this.astrodetails.astrologer_id + this.userId.data.user_id;

        //   let textMessage ={
        //                     "text":messageStr,
        //                     "user":{"_id":Number(this.userId.data.user_id),"name":this.chatform[0].fullname},
        //                     "createdAt":new Date(),
        //                     "_id":"af1b9b23-a7fd-41a6-a367-6bf9cf8043ed",
        //                     "userId": Number(this.astrodetails.astrologer_id),
        //                     "receiverId":Number(this.userId.data.user_id),     
        //                     "messageId":"af1b9b23-a7fd-41a6-a367-6bf9cf8043ed",     
        //                     "receiver":{"_id":Number(this.astrodetails.astrologer_id),"name":"Pooja Katiya","avatar":"https://koli-media-stag.s3-ap-southeast-1.amazonaws.com/users/file-161961303737292071430-198e-4113-81d8-c06417cd644d.jpg"},
        //                     "messageType":"text","image":null
        //                   };
   
        //   var sendData =  {
        //                     message : textMessage,
        //                     userId  : this.userId.data.user_id,
        //                     receiverId : this.astrodetails.astrologer_id,
        //                   }
        //   this.socketService.sendFirstMessage(sendData);
        // }

        this.showchatmodal = false;
        this.chatsectionpopup = false;
        // this.router.navigateByUrl('/chatscreen', { state: { astrologer_id: this.data.astroIdforchat, caller_id: this.chatApiresponse.caller_id } });
        // this.router.navigateByUrl(`/chatscreen/${this.chatApiresponse.caller_id}`);
        window.location.href = '/chatscreen/'+this.chatApiresponse.caller_id;

      });
    }

  }

  callnow() {
    this.userService.addCall(this.userId.data.user_id, this.forcall).subscribe((data: any) => {
      this.callApiresponse = data;
      if (this.callApiresponse.status) {
        this.callId = this.callApiresponse.callId;
        this.timeLeft = 60;
        this.startTimer();
        this.callsectionpopup = false;
        this.callwaitingscreenpopup = true;
      } else {
        this.busy = true;
        this.statusMessage = "Astrologer currenctly busy";
        this.callsectionpopup = false;
        this.oopsscreenpopup = true;
      }

    });
    // this.startcallTimer();
    // this.callsectionpopup = false;
    // this.callwaitingscreenpopup = true;
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

  startTimer() {
    this.interval = setInterval(() => {
      if (this.callId != '') {
        this.orderService.getcallingStatus(this.callId).subscribe((data: any) => {
          console.log('first step',data);
          if (data.status) {
            if (data.data == 'CustomerUp') {
              clearInterval(this.interval);
              var connectedTime = 5;
              this.interval = setInterval(() => {
                connectedTime--;
                if (connectedTime == 0) {
                  this.statusMessage = 'You are successfully connected to astrologer, Thanks ! ';
                  this.connectedCall();

                }
                this.display = this.transform(this.timeLeft)
              }, 1000);
            }
            if (data.data == 'missed' || data.data == 'CustomerHangup' || data.data == 'AgentHangup') {
              this.statusMessage = 'Call Cancelled!';
              clearInterval(this.interval);
              this.calcelledCall()
            }
          }
        })
      } else {
        this.statusMessage = "caller Id required";
        this.callsectionpopup = false;
        this.hide = true;
      }

      this.timeLeft--;
      if (this.timeLeft == 0) {
        clearInterval(this.interval);
        this.calcelledCall();
      }
      this.display = this.transform(this.timeLeft)
    }, 1000);
  }

  transform(value: number): string {
    var sec_num = value;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    return ("0" + hours).slice(-2) + ':' + ("0" + minutes).slice(-2) + ':' + ("0" + seconds).slice(-2);

  }

  connectedCall() {
    this.callwaitingscreenpopup = false;
    this.oopsscreenpopup = false;
    this.showStatuswindow = true;
    this.startcallTimer()
  }

  startcallTimer() {
    var calltime = this.checkuserbalance.data.talktimeSeconds;
    console.log("=====>");
    this.interval = setInterval(() => {
      calltime--;

      //check calling status
      this.orderService.getcallingStatus(this.callId).subscribe((data: any) => {
        console.log('up',data);
        if (data.status) {
          if (data.data == 'answered' || data.data == 'CustomerHangup') {
            clearInterval(this.interval);
            this.statusMessage = 'Call completed';
            this.showStatuswindow = false;
            this.showratingreviewmodalcall = true;
          }
        }
      })

      if (calltime == 0) {
        clearInterval(this.interval);
      }
      this.display = this.transform(this.timeLeft)
    }, 1000);
  }

  calcelledCall() {
    clearInterval(this.interval);
    this.callwaitingscreenpopup = false;
    this.oopsscreenpopup = true;
    this.orderService.callMissed(this.callId).subscribe((data: any) => {
      console.log('missed update data===>>>', data)
    })
  }

  pauseTimerforcall() {
    clearInterval(this.interval);
    this.callwaitingscreenpopup = false;
    this.oopsscreenpopup = true;
  }

  flash() {
    setTimeout(() => {
      this.errormessageforfullname = '';
      this.errormessageforbirthplace = '';
      this.errormessageforgender = '';
      this.errormessagefordob = '';
    }, 3000);
  }

  endChat() {
    this.userService.userEndchat(this.data.order_id).subscribe((data: any) => {
      if (data.status) {
        localStorage.setItem('timecountDown', '0');
        clearInterval(this.interval);
        this.router.navigate(['/chatwithastro']);
        this.showchatmodal = true;
        this.walletbalancepopup = false;
        this.showendchatmodal = false;
        this.showratingreviewmodalchat = true;
      } else {
        this.showratingreviewmodalchat = false;
        alert('Network issue')
      }

    })
  }

  resumechat() {
    this.showchatmodal = false;
    this.showendchatmodal = false;
    window.location.reload();
  }

  addratingsreviews() {
    this.reviewsonly = (<HTMLInputElement>document.getElementById("addreviewsonly")).value;
    if (this.ratingsonly != null) {
      this.ratingsService.addreviewRating(this.reviewsonly, this.ratingsonly).subscribe((data: any) => {
        this.reviewratingdata = data;
        if (this.reviewratingdata.status == true) {
          this.ratingreviewmsg = this.reviewratingdata.message;
          (<HTMLInputElement>document.getElementById("addreviewsonly")).value = '';
          window.location.href = '/';
        } else {
          this.ratingreviewmsg = "something wrong with network";
        }
      });
    } else {
      this.ratingreviewmsg = "Ratings required";
    }
  }

  addratingsonly(ratings: any) {
    if (ratings != '') {
      this.ratingsonly = ratings;
    } else {
      this.ratingsonly = '';
    }
  }

  backtoAstro() {
    this.router.navigate(['/talktoastro']);
    window.location.reload();
  }

  retryCall() {
    this.callsectionpopup = true;
    this.callwaitingscreenpopup = false;
    this.oopsscreenpopup = false;
    this.showStatuswindow = false;
    this.callnow();
  }

}
