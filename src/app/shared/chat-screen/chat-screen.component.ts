//import { Component, OnInit, ViewChild } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  // @ViewChild('content') private content: any;
  @ViewChild('scrollMe') private myScrollContainer: any = ElementRef;

  astrodetails: any = [];
  checkuserbalance: any = [];
  orderInfo: any = [];
  waitingSuccess: boolean = true;
  windowsMove: boolean = false;
  countdownTimer: any = 0;
  time: number = 0;
  waittime = 120;
  display: any;
  waitdisplay: any;
  interval: any;
  CurrentBalance: any = [];
  astrologerId: any;
  roomId: any;
  tmproomId: any;
  messageList: any = [];
  orderId: any;
  get_duration_interval: any
  userPhoto:any='https://www.onegodmed.com/admin-assets/assets/images/users/no-image.png';

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
    // alert(history.state.astrologer_id);
    this.socketService.connectSocket();
    var encodedOrderId = this.activatedRoute.snapshot.params['id'];
    this.orderId = encodedOrderId;
    var decodedOrderid = atob(encodedOrderId);
    this.userPhoto = localStorage.getItem('userPhoto')

    this.checkStatus(decodedOrderid);
    this.waitTimer();

    this.get_duration_interval = setInterval(() => { this.checkStatus(decodedOrderid) }, 2000);

    this.orderservice.getorderInfo(decodedOrderid).subscribe((data: any) => {
      this.orderInfo = data;
      this.astrologerId = this.orderInfo.data.astrologer_id;
      this.astrologerlistService.astrodetailspopup(this.astrologerId).subscribe((data: any) => {
        this.astrodetails = data;
      });
      this.userService.checkuserbalance(this.astrologerId).subscribe((data: any) => {
        this.checkuserbalance = data
        console.log('checkuserbalance===>', this.checkuserbalance);
        // if (this.checkuserbalance.status) {
        //   this.time = this.checkuserbalance.data.talktimeSeconds;
        // }
      })
    });

    this.userService.userWalletdetails().subscribe((data: any) => {
      this.CurrentBalance = data;
    });

  }

  checkStatus(decodedOrderid: any) {
    this.orderservice.getorderInfo(decodedOrderid).subscribe((data: any) => {
      if (data.status) {
        if (data.data.is_Active == 'Cancel') {
          this.router.navigate(['/'])
        }
        //  this.astrologerName = result.data.first_name+''+result.data.last_name;
        if (data.data.start_chatTime == null) {
          console.log('comming on ==>waiting window');
        } else {
          this.waitingSuccess = false;
          clearInterval(this.interval);
          clearInterval(this.get_duration_interval);
         
         
          // this.router.navigate(['/chatscreen', this.orderId])
          // window.location.reload(); 

          this.orderservice.getorderInfo(decodedOrderid).subscribe((data: any) => {
            this.orderInfo = data
            console.log('orderInfo===>', this.orderInfo);
            if (this.orderInfo.status) {
              this.astrologerId = this.orderInfo.data.astrologer_id;
              this.astrologerlistService.astrodetailspopup(this.astrologerId).subscribe((data: any) => {
                this.astrodetails = data;
              });
              this.userService.checkuserbalance(this.astrologerId).subscribe((data: any) => {
                this.checkuserbalance = data
                console.log('checkuserbalance===>', this.checkuserbalance);
                if (this.checkuserbalance.status) {
                  this.time = localStorage.getItem('timecountDown') != 'null' && localStorage.getItem('timecountDown') != '0' ? (this.checkuserbalance.data.talktimeSeconds) - Number(localStorage.getItem('timecountDown')) : this.checkuserbalance.data.talktimeSeconds;
                  // this.time = this.checkuserbalance.data.talktimeSeconds;
                  // this.time = 5;
                  // alert(this.time);
                }
              })
              if (this.orderInfo.data.start_chatTime != null && (this.orderInfo.data.is_Active == 'Running' || this.orderInfo.data.is_Active == 'Accept')) {

                if (this.CurrentBalance.data.user_id > parseInt(this.astrologerId)) {
                  this.roomId = this.astrologerId + this.CurrentBalance.data.user_id;
                } else {
                  this.roomId = this.CurrentBalance.data.user_id + this.astrologerId;
                }

                this.tmproomId = this.CurrentBalance.data.user_id + this.astrologerId;


                this.join(this.CurrentBalance.data.user_id, Number(this.roomId));
                const timeOfLast = new Date().getTime();
                this.socketService.getMessage({ fromdate: 0, todate: timeOfLast, roomId: this.roomId, limit: 50 })
                  .subscribe((message) => {
                    console.log("comming msg from node socket==>", message);
                    let messages: any[] = [];
                    message.forEach((element: { reqmessagedata: string; }) => {
                      element.reqmessagedata = JSON.parse(element.reqmessagedata);
                      messages.push(element);
                    });
                    this.messageList = messages.reverse();

                    // setTimeout(() => {
                    this.scrollToBottomOnInit();
                    // window.scrollTo(0,9999);
                    // }, 300);
                  });
                this.startTimer();
              } else {
                //  this.redirectScreen('tabs/astrologers/');
                this.router.navigateByUrl('/chatwithastro');
              }

            } else {
              // this.redirectScreen('home');
              this.router.navigateByUrl('/');
            }
          });
        }
      } else {
        this.router.navigate(['/'])
      }

    });
  }

  join(userId: Number, roomId: Number): void {
    this.socketService.joinUser(userId, roomId).subscribe((msg) => {
      msg.reqmessagedata = msg.message;
      console.log('zxcvbn===>', msg);
      this.messageList.push(msg);

      // setTimeout(() => {
      this.scrollToBottomOnInit();
      // window.scrollTo(0,9999);
      // }, 300);

    });
  }

  scrollToBottomOnInit() {
    console.log('scrolled');
    // this.content.scrollToBottom(500);
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  openDialogclosed() {
    let order_id = this.orderId;
    let astroId_endchat = this.astrologerId;
    this.dialog.open(AstrologerCallPopupComponent, {
      data: { order_id, astroId_endchat }
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.time--;

      this.countdownTimer = localStorage.getItem('timecountDown') != 'null' ? Number(localStorage.getItem('timecountDown')) : 0;
      this.countdownTimer++;
      localStorage.setItem('timecountDown', this.countdownTimer.toString());

      if (this.time == 0) {
        clearInterval(this.interval);
        this.endChat();
      }

      this.display = this.transform(this.time)
    }, 1000);
  }

  waitTimer() {
    this.interval = setInterval(() => {
      this.waittime--;
      if (this.waittime == 0) {
        clearInterval(this.interval);
        this.calcelledChat();
      }
      this.waitdisplay = this.transform(this.waittime)
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

    if (messageText != '') {
      var message = {
        "text": messageText,
        "user": { "_id": this.CurrentBalance.data.user_id, "name": localStorage.getItem('UserName') },
        "createdAt": new Date()
      };

      let textMessage = {
        "text": messageText,
        "user": { "_id": this.CurrentBalance.data.user_id, "name": localStorage.getItem('UserName') },
        "createdAt": new Date(),
        "userId": this.CurrentBalance.data.user_id,
        "receiverId": this.astrologerId,
      };
      var sendData = {
        message: textMessage,
        userId: this.CurrentBalance.data.user_id,
        receiverId: this.astrologerId,
      }

      this.socketService.sendMessage(sendData, this.roomId);
      (<HTMLInputElement>document.getElementById("textmessage")).value = '';
      // window.scrollTo(0,9999);

    }
  }

  calcelledChat() {
    this.userService.autoCancelledchat(this.orderId).subscribe((data: any) => {
      if (data.status) {
        this.router.navigate(['/chatwithastro']).then(() => {
          window.location.reload();
        })
      }
    });
  }

  endChat() {
    this.userService.userEndchat(this.orderId).subscribe((data: any) => {
      if (data.status) {
        localStorage.setItem('timecountDown', '0');
        clearInterval(this.interval);
        this.router.navigate(['/']);
        // window.location.href = '/';
        this.addreviewandrating(this.astrologerId);
      } else {
        alert('Network issue')
      }

    })
  }

  addreviewandrating(astrologerId_forratingreview: any) {
    this.dialog.open(AstrologerCallPopupComponent, {
      data: { astrologerId_forratingreview }
    });
  }

}
