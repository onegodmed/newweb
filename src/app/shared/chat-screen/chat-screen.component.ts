import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AstrologerCallPopupComponent } from '../astrologer-call-popup/astrologer-call-popup.component';
import { SocketService } from 'src/app/services/socket.service'; 

var $ : any;
var element : any;

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss']
})

export class ChatScreenComponent implements OnInit {

  waitingSuccess: boolean = true;
  windowsMove: boolean = false;

  constructor(private router: Router, public dialog: MatDialog, private socketService: SocketService) { }

  ngOnInit(): void {
    
    this.socketService.connectSocket();
    // this.socketService.users();
    
    setTimeout(()=>{
      this.waitingSuccess = false;
    }, 6000);
  }

  openDialogclosed() {
    this.dialog.open(AstrologerCallPopupComponent);
  }

}
