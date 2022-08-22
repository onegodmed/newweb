import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AstrologerCallPopupComponent } from '../astrologer-call-popup/astrologer-call-popup.component';
import { AstrologerlistService } from "../../services/astrologerlist.service";
import { UserService } from "../../services/user.service";
import { SocketService } from 'src/app/services/socket.service';
import { OrderService } from 'src/app/services/order.service';

var $: any;
var element: any;

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss']
})

export class ChatScreenComponent implements OnInit {

  @ViewChild('content') private content: any;

  astrodetails: any = [];
  checkuserbalance: any = [];
  orderInfo: any = [];
  waitingSuccess: boolean = true;
  windowsMove: boolean = false;
  countdownTimer: any = 0;
  time: number = 0;
  display: any;
  interval: any;
  CurrentBalance: any = [];
  astrologerId: any = 3756;
  roomId: any;
  tmproomId: any;
  messageList: any = [];

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private socketService: SocketService,
    public astrologerlistService: AstrologerlistService,
    public userService: UserService,
    public orderservice: OrderService) {
  }

  ngOnInit(): void {
    // console.log(history.state.id);
    // alert(history.state.astrologer_id);
    this.socketService.connectSocket();
    // this.socketService.users();

    setTimeout(() => {
      this.waitingSuccess = false;
    }, 2000);

    this.astrologerlistService.astrodetailspopup(3756).subscribe((data: any) => {
      this.astrodetails = data;
    });

    this.userService.checkuserbalance(3756).subscribe((data: any) => {
      this.checkuserbalance = data;
      this.time = this.checkuserbalance.data.talktimeSeconds;
    });

    this.userService.userWalletdetails().subscribe((data: any) => {
      this.CurrentBalance = data;
    });

    // this.startTimer();

    this.orderservice.getorderInfo(9462).subscribe((data: any) => {
      this.orderInfo = data
      console.log('orderInfo===>',this.orderInfo);
      if (this.orderInfo.status) {
        this.userService.checkuserbalance(this.astrologerId).subscribe((data: any) => {
          this.checkuserbalance = data
      console.log('checkuserbalance===>',this.checkuserbalance);
      if (this.checkuserbalance.status) {
            this.time = this.checkuserbalance.data.talktimeSeconds;
          }
        })
        if(this.orderInfo.data.start_chatTime!=null && (this.orderInfo.data.is_Active=='Running' || this.orderInfo.data.is_Active=='Accept') ){
          // alert(this.CurrentBalance.data.user_id);
  
          if(this.CurrentBalance.data.user_id > parseInt(this.astrologerId))  
          {
           this.roomId = this.astrologerId + this.CurrentBalance.data.user_id;
          }else
          {
            this.roomId =  this.CurrentBalance.data.user_id + this.astrologerId;
          }   

        this.tmproomId = this.CurrentBalance.data.user_id + this.astrologerId;


       this.join(this.CurrentBalance.data.user_id, Number(this.roomId));
      const timeOfLast = new Date().getTime();
      this.socketService.getMessage({fromdate:0,todate: timeOfLast,roomId:this.roomId,limit:50})
        .subscribe((message) => {
          console.log("comming msg from node socket==>",message);
          let messages: any[]= [];
          message.forEach((element: { reqmessagedata: string; }) => {
            element.reqmessagedata = JSON.parse(element.reqmessagedata);
            messages.push(element);
          });
          this.messageList = messages.reverse();   

         setTimeout(() => {           
           this.scrollToBottomOnInit();
          // window.scrollTo(0,9999);
         }, 300);
        });
        this.startTimer();
      }else{
      //  this.redirectScreen('tabs/astrologers/');
      // this.router.navigateByUrl('');
      }

            }else{
              // this.redirectScreen('home');
              // this.router.navigateByUrl('');
            }
      });

  }

  join(userId: Number, roomId: Number): void {
    this.socketService.joinUser(userId, roomId).subscribe((msg)=>{      
      msg.reqmessagedata=msg.message;
      console.log('zxcvbn===>',msg); 
      this.messageList.push(msg);

      setTimeout(() => {      
        this.scrollToBottomOnInit();
        // window.scrollTo(0,9999);
      }, 300);

    });
  //  console.log();
  }

  scrollToBottomOnInit() {
    console.log('scrolled');
     this.content.scrollToBottom(500);
   }

  openDialogclosed() {
    // let order_id = history.state.caller_id;
    let order_id = 1234;
    let astroId_endchat = 3756;
    // alert(order_id);
    this.dialog.open(AstrologerCallPopupComponent, {
      data: { order_id, astroId_endchat }
    });
  }

  startTimer() {
    console.log("=====>");
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time--;
      } else {
        this.time = this.checkuserbalance.data.talktimeSeconds;
        this.pauseTimer();
      }

      if (this.time == 0) { }

      this.display = this.transform(this.time)
    }, 1000);
  }

  transform(value: number): string {
    var sec_num = value;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    return ("0" + hours).slice(-2) + ':' + ("0" + minutes).slice(-2) + ':' + ("0" + seconds).slice(-2);

  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  sendMessage(): void {


    const messageText = (<HTMLInputElement>document.getElementById("textmessage")).value;
    alert(messageText);

    if(messageText!=''){
    var message ={"text":messageText,
    "user":{"_id":this.CurrentBalance.data.user_id,"name":localStorage.getItem('UserName')},
    "createdAt":new Date()};

    let textMessage ={"text":messageText,
    "user":{"_id":this.CurrentBalance.data.user_id,"name":localStorage.getItem('UserName')},
    "createdAt":new Date(),
    "userId": this.CurrentBalance.data.user_id,
    "receiverId":this.astrologerId,     
    };
     var sendData =  {
                    message : textMessage,
                    userId  : this.CurrentBalance.data.user_id,
                    receiverId : this.astrologerId,
                  }

    this.socketService.sendMessage(sendData, this.roomId);
    (<HTMLInputElement>document.getElementById("textmessage")).value = '';
    // window.scrollTo(0,9999);
  }
}

}
