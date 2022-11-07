import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeastrologerlistService } from "src/app/services/homeastrologerlist.service";
import { MatDialog } from '@angular/material/dialog';
import { AstrologerCallPopupComponent } from 'src/app/shared/astrologer-call-popup/astrologer-call-popup.component';
import { SingUpPopupComponent } from 'src/app/shared/sing-up-popup/sing-up-popup.component';
import { ExpressionType } from '@angular/compiler';



@Component({
  selector: 'app-tabs-online-astrologers',
  templateUrl: './tabs-online-astrologers.component.html',
  styleUrls: ['./tabs-online-astrologers.component.scss']
})
export class TabsOnlineAstrologersComponent implements OnInit {
  // toppingList: string[] = ['New', 'Astrology', '5', '26', '10'];
  categoryfilter: string = "default";
  IsLoggedIn: boolean = false;
  datawithfilter:any;

  constructor(private router: Router, public HomeastrologerlistService: HomeastrologerlistService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.IsLoggedIn = true;
    }else{
      this.IsLoggedIn = false;
    }

  
    
    this.HomeastrologerlistService.homeastrolist();  
  }

  changecategory(value: string) {
    this.categoryfilter = value;
    this.datawithfilter = this.HomeastrologerlistService.homeastrolistwithfilter(this.categoryfilter);
   
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
      data: { astroIdforcall   }
    });
  }
  
  
  seeall(){
    window.location.href = 'talktoastro';
  }
  

}
