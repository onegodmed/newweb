import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AstrologerlistService } from "../../services/astrologerlist.service";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatDialog } from '@angular/material/dialog';
import { AstrologerCallPopupComponent } from '../../shared/astrologer-call-popup/astrologer-call-popup.component';
import { ChatScreenComponent } from 'src/app/shared/chat-screen/chat-screen.component';

@Component({
  selector: 'app-chat-with-astrologer',
  templateUrl: './chat-with-astrologer.component.html',
  styleUrls: ['./chat-with-astrologer.component.scss']
})
export class ChatWithAstrologerComponent implements OnInit {

  page: number = 1;
  categoryfilter: any;
  sortingfilter: any;
  searchbyname: any
  toppings = new FormControl('');
  toppingList: string[] = ['Numerology', 'Vastu Shastra', 'Tarot Cards', 'Palmistry', 'Reiki Healing'];

  sortings = new FormControl('');
  sortingList: string[] = ['Price: High To Low', 'Price: Low To High', 'Rating: High To Low', 'Rating: Low To High', 'Exp: High To Low', 'Exp: High To Low'];



  constructor(private router: Router, public astrologerlistService: AstrologerlistService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname);
  }

  // getdata() {
  //   console.log("Scrolled");
  //   this.page = this.page + 1;
  //   this.astrologerlistService.astrolist(this.page);
  // }

  changefilter(value: any) {
    // alert(value);
    this.categoryfilter = value;
    this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname);
  }

  categorywiselist(category: any) {
    this.categoryfilter = [category];
    this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname);
    window.scroll(0, 0);
  }

  seachastrobyname() {
    this.searchbyname = (<HTMLInputElement>document.getElementById("searchname")).value;
    this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname);
    // window.scroll(0, 0);
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

  openDialog(astroId: any){
    // alert(astroId);
    this.dialog.open(AstrologerCallPopupComponent, {
      data: {astroId}
    });
  }

  openchatpage() {
    this.router.navigateByUrl("/chatscreen");
  }

}
