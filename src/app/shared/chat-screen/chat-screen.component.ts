import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AstrologerCallPopupComponent } from '../astrologer-call-popup/astrologer-call-popup.component';

var $ : any;
var element : any;

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss']
})

export class ChatScreenComponent implements OnInit {

  waitingSuccess: boolean = true;

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.waitingSuccess = false;
    }, 3000);
  }

  openDialogclosed() {
    this.dialog.open(AstrologerCallPopupComponent);
  }


}
