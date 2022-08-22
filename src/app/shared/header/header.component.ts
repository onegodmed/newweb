import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { SingUpPopupComponent } from '../sing-up-popup/sing-up-popup.component';
import { LogoutService } from "../../services/logout.service";
import { UserService } from "../../services/user.service";


var $: any;
var element: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fade',
      [
        state('void', style({ opacity: 0 })),
        transition(':enter', [animate(300)]),
        transition(':leave', [animate(500)]),
      ]
    )]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: any;
  isLoggedOut: any;
  showusername: any = '';
  CurrentBalance: any = [];
  logoutresponse: any;
  redirectUrl: any;

  constructor(private router: Router, public dialog: MatDialog, private logoutService: LogoutService, public userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.isLoggedIn = true;
      this.isLoggedOut = false;
    } else {
      this.isLoggedOut = true;
      this.isLoggedIn = false;
    }

    if (localStorage.getItem("UserName") != null) {
      this.showusername = localStorage.getItem("UserName");
    } else {
      this.showusername = '';
    }

    this.userService.userWalletdetails().subscribe((data: any) => {
      this.CurrentBalance = data;
    });

    $(document).ready(() => {
      $(window).scroll(() => {
        if ($(this).scrollTop() > 10) {
          $('.header-section').removeClass('header-section');
        }
        else {
          $('.header-section').addClass('is--large');
        }
      });

      $(window).scroll(function () {

        if ($(window).scrollTop() >= 100) {
          $('.header-section').addClass('fixed-header');
        } else {
          $('.header-section').removeClass('fixed-header');
        }
      });

    });
  }
  

  openDialog() {
    this.dialog.open(SingUpPopupComponent);
  }

  loggedout() {
    this.logoutService.logout().subscribe((data) => {
      this.logoutresponse = data;
      if (this.logoutresponse.status === true) {
        localStorage.setItem('token', '');
        localStorage.setItem('UserName', '');
        localStorage.removeItem('token');
        localStorage.removeItem('UserName');
        this.isLoggedOut = true;
        this.isLoggedIn = false;
        this.router.navigate(['']);
        window.location.reload();
      }
    });
  }

  route4() {
    this.router.navigateByUrl("/loginpage");
  }
  route1() {
    this.router.navigateByUrl("/talktoastro");
  }
  route2() {
    this.router.navigateByUrl("/chatwithastro");
  }
  route3() {
    this.router.navigateByUrl("/blogpage");
  }
  route5() {
    this.router.navigateByUrl("/vedic-astrology");
  }
  route6() {
    this.router.navigateByUrl("/premium-report");
  }
  follow() {
    this.router.navigateByUrl("/followinguserdetails");
  }
  walletPage() {
    this.router.navigateByUrl("/wallet");
  }
  openProfileedite() {
    this.router.navigateByUrl("/profileupdate");
  }
}


function onWindowScroll(e: any, any: any) {
  throw new Error('Function not implemented.');
}

