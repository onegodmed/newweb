import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeastrologerlistService } from "../../services/homeastrologerlist.service";
import { MatDialog } from '@angular/material/dialog';
import { AstrologerCallPopupComponent } from 'src/app/shared/astrologer-call-popup/astrologer-call-popup.component';
import { SingUpPopupComponent } from 'src/app/shared/sing-up-popup/sing-up-popup.component';


@Component({
  selector: 'app-tabs-online-astrologers',
  templateUrl: './tabs-online-astrologers.component.html',
  styleUrls: ['./tabs-online-astrologers.component.scss']
})
export class TabsOnlineAstrologersComponent implements OnInit {
  IsLoggedIn: boolean = false;

  constructor(private router: Router, public astrologerlistService: HomeastrologerlistService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.IsLoggedIn = true;
    }else{
      this.IsLoggedIn = false;
    }
    
    this.astrologerlistService.homeastrolist();
  }

  astrodetailspage(id: any) {
    if (id != null) {
      if (localStorage.getItem('astrologer_id') != null) {
        localStorage.setItem('astrologer_id', id);
      } else {
        localStorage.setItem('astrologer_id', id);
      }
      this.router.navigateByUrl('/profileastrologer');
    } else {
      alert('Astrologer Id Required');
    }
  }

  openDialog(astroIdforcall: any) {
    this.dialog.open(AstrologerCallPopupComponent, {
      data: { astroIdforcall }
    });
  }

  logindialogopen(astroIdforcall: any) {
    this.dialog.open(SingUpPopupComponent, {
      data: { astroIdforcall }
    });
  }
  

}
