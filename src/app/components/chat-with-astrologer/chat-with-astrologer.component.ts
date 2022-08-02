import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AstrologerlistService } from "../../services/astrologerlist.service";
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatDialog } from '@angular/material/dialog';
import { AstrologerCallPopupComponent } from '../../shared/astrologer-call-popup/astrologer-call-popup.component';
import { ChatScreenComponent } from 'src/app/shared/chat-screen/chat-screen.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-with-astrologer',
  templateUrl: './chat-with-astrologer.component.html',
  styleUrls: ['./chat-with-astrologer.component.scss']
})
export class ChatWithAstrologerComponent implements OnInit {

  username: any = '';
  astrolist: any = [];
  usercurrentbalance: any = [];
  page: number = 1;
  categoryfilter: any;
  sortingfilter: any;
  searchbyname: any
  toppings = new FormControl('');
  toppingList: string[] = ['Numerology', 'Vastu Shastra', 'Tarot Cards', 'Palmistry', 'Reiki Healing'];

  sortings = new FormControl('');
  sortingList: string[] = ['Price: High To Low', 'Price: Low To High', 'Rating: High To Low', 'Rating: Low To High', 'Exp: High To Low', 'Exp: High To Low'];

  constructor(private router: Router, public astrologerlistService: AstrologerlistService,public dialog: MatDialog, public userService: UserService) { }

  ngOnInit(): void {
    
    if(localStorage.getItem('token') != null){
      this.username = localStorage.getItem('UserName');
      this.userService.userWalletdetails().subscribe((data: any) => {
        this.usercurrentbalance = data;
      });
    }else{
      this.username = '';
      this.usercurrentbalance = '';
    }

    this.alluserlist();

    // this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname);
  }

  alluserlist() {
    this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname).subscribe((data) => {
      this.astrolist = data;
      // console.log('hi sam',this.astrolist.totalCount);
    });
  }

  changefilter(value: any) {
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

  openDialog(astroIdforchat: any){
    this.dialog.open(AstrologerCallPopupComponent, {
      data: {astroIdforchat}
    });
  }

  openchatpage() {
    this.router.navigateByUrl("/chatscreen");
  }

  onScroll() {
    console.log("scrolled down!!");
    if (this.astrolist.totalCount >= this.page) {
      this.page = this.page + 10;
      console.log(this.page);
      this.alluserlist();
    }
    // alert(this.page); 
  }

}
