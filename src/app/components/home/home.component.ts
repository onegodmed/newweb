import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SingUpPopupComponent } from 'src/app/shared/sing-up-popup/sing-up-popup.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  IsLoggedIn: boolean = false;

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.IsLoggedIn = true;
    }else{
      this.IsLoggedIn = false;
    }
  }

  kundali(){
    this.router.navigateByUrl("/kundalipage");
  }
  matchmaking(){
    this.router.navigateByUrl("/matchmakingpage");
  }
  panchang(){
    this.router.navigateByUrl("/panchangpage");
  }
  horoscope(){
    this.router.navigateByUrl("/horoscopepage");
  }
  numerology(){
    this.router.navigateByUrl("/numerologypage");
  }

  openDialog() {
    this.dialog.open(SingUpPopupComponent);
  }

  rechargewallet(){
    this.router.navigateByUrl("/wallet");
  }


}
