import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AstrologerlistService } from "../../services/astrologerlist.service";
import { FollounfollowService } from "../../services/follounfollow.service";
import { MatDialog } from '@angular/material/dialog';
import { ProcessPayPopupComponent } from 'src/app/shared/process-pay-popup/process-pay-popup.component';
import { AstrologerCallPopupComponent } from 'src/app/shared/astrologer-call-popup/astrologer-call-popup.component';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-talk-to-astrologer',
  templateUrl: './talk-to-astrologer.component.html',
  styleUrls: ['./talk-to-astrologer.component.scss']
})
export class TalkToAstrologerComponent implements OnInit {

  username: any = '';
  usercurrentbalance: any = [];
  astrolist: any = [];
  page: number = 10;
  astro_id: any = '';
  followresponse: any = {};
  followerlist: any = {};
  categoryfilter: any = [];
  sortingfilter: any;
  searchbyname: any;
  isfollow: any;
  isunfollow: boolean = true;
  toppings = new FormControl('');
  toppingList: string[] = ['Numerology', 'Vastu Shastra', 'Tarot Cards', 'Palmistry', 'Reiki Healing'];

  sortings = new FormControl('');
  sortingList: string[] = ['Price: High To Low', 'Price: Low To High', 'Rating: High To Low', 'Rating: Low To High', 'Exp: High To Low', 'Exp: High To Low'];

  constructor(private router: Router, public astrologerlistService: AstrologerlistService, public followunfollowlistService: FollounfollowService, public dialog: MatDialog, public userService: UserService) {
  }

  ngOnInit(): void {

    if (localStorage.getItem('token') != null) {
      this.username = localStorage.getItem('UserName');
      this.userService.userWalletdetails().subscribe((data: any) => {
        this.usercurrentbalance = data;
      });
    } else {
      this.username = '';
      this.usercurrentbalance = '';
    }
  
    this.alluserlist();
    // this.followunfollowlistService.getfollowlist();
    this.followunfollowlistService.getfollowlist().subscribe((data) => {
      this.followerlist = data;
      // console.log('hi sam', this.followerlist.data[0].astro_id);
    });
  }

  openDialog(astroIdforcall: any) {
    this.dialog.open(AstrologerCallPopupComponent, {
      data: { astroIdforcall }
    });
  }

  alluserlist() { 
    this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname).subscribe((data) => {
      this.astrolist = data;
    });
  }

  follow() {
    this.astro_id = (<HTMLInputElement>document.getElementById("astro_id")).value;
    if (this.astro_id != null && localStorage.getItem("token") != null) {
      this.followunfollowlistService.follow(this.astro_id).subscribe((data) => {
        this.followresponse = data;
        console.log(this.followresponse.status);
        if (this.followresponse.status === true) {
          this.isfollow = true;
          this.isunfollow = false;
        } else {
          this.isfollow = true;
          this.isunfollow = false;
        }
      });
    } else {
      this.isfollow = true;
      this.isunfollow = true;
    }
  }

  unfollow() {
    this.astro_id = (<HTMLInputElement>document.getElementById("astro_id")).value;
    if (this.astro_id != null && localStorage.getItem("token") != null) {
      this.followunfollowlistService.unfollow(this.astro_id).subscribe((data) => {
        this.followresponse = data;
        console.log(this.followresponse.status);
        if (this.followresponse.status === true) {
          this.isfollow = false;
          this.isunfollow = true;
        } else {
          this.isfollow = false;
          this.isunfollow = true;
        }
      });
    } else {
      this.isfollow = true;
      this.isunfollow = true;
    }
  }

  changefilter(value: any) {
    this.categoryfilter = value;
    this.alluserlist();
    // this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname);
  }

  sortingchangefilter(value: any) {
    if (value === 'Price: High To Low') {
      this.sortingfilter = { field: 'price', sortby: 'ASC' }
    } else {
      this.sortingfilter = { field: 'price', sortby: 'DESC' }
    }

    if (value === 'Rating: High To Low') {
      this.sortingfilter = { field: 'rating', sortby: 'ASC' }
    } else {
      this.sortingfilter = { field: 'rating', sortby: 'DESC' }
    }

    if (value === 'Exp: High To Low') {
      this.sortingfilter = { field: 'experience', sortby: 'ASC' }
    } else {
      this.sortingfilter = { field: 'experience', sortby: 'DESC' }
    }
    this.alluserlist();
    // this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname);
  }

  categorywiselist(category: any) {
    this.categoryfilter = [category];
    this.alluserlist();
    window.scroll(0, 0);
  }

  seachastrobyname() {
    this.searchbyname = (<HTMLInputElement>document.getElementById("searchname")).value;
    this.alluserlist();
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


  onScroll() {
    console.log("scrolled down!!");
    if (this.astrolist.totalCount >= this.page) {
      this.page = this.page + 10;
      console.log(this.page);
      this.alluserlist();
    }
  }

}
