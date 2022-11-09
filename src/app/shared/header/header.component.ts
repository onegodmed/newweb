import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { SingUpPopupComponent } from '../sing-up-popup/sing-up-popup.component';

var $ : any;
var element : any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[ 
    trigger('fade',
    [ 
      state('void', style({ opacity : 0})),
      transition(':enter',[ animate(300)]),
      transition(':leave',[ animate(500)]),
    ]
  )]
})
export class HeaderComponent implements OnInit {
  
  constructor(private router: Router, public dialog: MatDialog) { 
  }

  ngOnInit(): void {
    $(window).scroll(() => {
      if ($(window).scrollTop() >= 300) {
        $('.header-section').addClass('fixed-header');
      } else {
        $('.header-section').removeClass('fixed-header');
      }
    }); 

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
  follow(){
    this.router.navigateByUrl("/followinguserdetails");
  }
  walletPage(){
    this.router.navigateByUrl("/wallet");
  }
  openProfileedite() {
    this.router.navigateByUrl("/profileupdate");
  }
}


function onWindowScroll(e: any, any: any) {
  throw new Error('Function not implemented.');
}

