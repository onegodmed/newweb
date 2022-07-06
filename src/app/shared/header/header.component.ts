import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SingUpPopupComponent } from '../sing-up-popup/sing-up-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(SingUpPopupComponent);
  }
  
  route4(){
    this.router.navigateByUrl("/loginpage");
  }
  route1(){
    this.router.navigateByUrl("/talktoastro");
  }
  route2(){
    this.router.navigateByUrl("/chatwithastro");
  }
  route3(){
    this.router.navigateByUrl("/blogpage");
  }
  route5(){
    this.router.navigateByUrl("/astrology");
  }
  route6(){
    this.router.navigateByUrl("/premium-report");
  }
}

