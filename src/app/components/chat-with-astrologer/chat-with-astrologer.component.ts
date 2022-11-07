import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AstrologerlistService } from "src/app/services/astrologerlist.service";
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatDialog } from '@angular/material/dialog';
import { AstrologerCallPopupComponent } from '../../shared/astrologer-call-popup/astrologer-call-popup.component';
import { UserService } from 'src/app/services/user.service';
import { FollounfollowService } from 'src/app/services/follounfollow.service';
import { SingUpPopupComponent } from 'src/app/shared/sing-up-popup/sing-up-popup.component';

@Component({
  selector: 'app-chat-with-astrologer',
  templateUrl: './chat-with-astrologer.component.html',
  styleUrls: ['./chat-with-astrologer.component.scss']
})
export class ChatWithAstrologerComponent implements OnInit {

  IsLoggedIn: boolean = false;
  astro_id: any = '';
  username: any = '';
  astrolist: any = [];
  usercurrentbalance: any = [];
  followresponse: any = {};
  followerlist: any = {};
  page: number = 0;
  categoryfilter: any;
  sortingfilter: any;
  searchbyname: any
  toppings = new FormControl('');
  toppingList: string[] = ['Numerology', 'Vastu Shastra', 'Tarot Cards', 'Palmistry', 'Reiki Healing'];

  sortings = new FormControl('');
  sortingList: string[] = ['Price: High To Low', 'Price: Low To High', 'Rating: High To Low', 'Rating: Low To High', 'Exp: High To Low', 'Exp: High To Low'];

  constructor(private router: Router,public followunfollowlistService: FollounfollowService, public astrologerlistService: AstrologerlistService,public dialog: MatDialog, public userService: UserService) { }

  // ngOnInit(): void {
    
  //   if(localStorage.getItem('token') != null){
  //     this.username = localStorage.getItem('UserName');
  //     this.userService.userWalletdetails().subscribe((data: any) => {
  //       this.usercurrentbalance = data;
  //     });
  //   }else{
  //     this.username = '';
  //     this.usercurrentbalance = '';
  //   }

  //   this.followunfollowlistService.getfollowlist().subscribe((data: any) => {
  //     this.followerlist = data;
  //     // console.log('hi sam', this.followerlist);
  //   });

  //   this.alluserlist();

  //   // this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname);
  // }
  
  ngOnInit(): void {

    if (localStorage.getItem('token') != null) {
      this.IsLoggedIn = true;
      this.username = localStorage.getItem('UserName');
      this.userService.userWalletdetails().subscribe((data: any) => {
        this.usercurrentbalance = data;
      });
    } else {
      this.IsLoggedIn = false;
      this.username = '';
      this.usercurrentbalance = '';
    }

    this.followunfollowlistService.getfollowlist().subscribe((data: any) => {
      this.followerlist = data;
      // console.log('hi sam', this.followerlist);
    });

    this.alluserlist();
    // this.followunfollowlistService.getfollowlist();

  }

  // alluserlist() {
  //   this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname).subscribe((data: any) => {
  //     this.astrolist = data;
  //     // console.log('hi sam',this.astrolist.totalCount);
  //   });
  // }

  alluserlist() {
    this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname).subscribe((data: any) => {
      if(this.followerlist.status){
        var tempArray: any = []
        for (let index = 0; index < data.data.length; index++) {
          var element = data.data[index];
          if (this.followerlist.data.includes(element.astrologer_id)) {
            element.followed = true
          } else {
            element.followed = false
          }
  
          tempArray.push(element)
  
        }
  
        this.astrolist.data = tempArray;
      }else{
        this.astrolist.data = data.data
      }
    });
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

  openDialog(astroIdforchat: any){
    this.dialog.open(AstrologerCallPopupComponent, {
      data: {astroIdforchat}
    });
  }

  logindialogopen(astroIdforcall: any) {
    this.dialog.open(SingUpPopupComponent, {
      data: { astroIdforcall }
    });
  }

  openchatpage() {
    this.router.navigateByUrl("/chatscreen");
  }

  // onScroll() {
  //   console.log("scrolled down!!");
  //   if (this.astrolist.totalCount >= this.page) {
  //     this.page = this.page + 10;
  //     console.log(this.page);
  //     this.alluserlist();
  //   }
  //   // alert(this.page); 
  // }

  onScroll() {
    console.log("scrolled down!!");
    // if (this.totalcount.totalCount >= this.astrolist.length) {
    this.page += 1;
    // this.alluserlist();
    // }
    console.log('=====>', this.page);


    this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname).subscribe((data: any) => {
     this.astrolist.data = data.data.concat(this.astrolist.data);
      console.log('====>',this.astrolist.data);
    })

  }

  follow(id: any) {
    this.astro_id = (<HTMLInputElement>document.getElementById("astro_id")).value;
    if (this.astro_id != null && localStorage.getItem("token") != null) {
      this.followunfollowlistService.follow(this.astro_id).subscribe((data: any) => {
        this.followresponse = data;
        // if (this.followresponse.status === true) {
        //   // this.isfollow = true;
        //   // this.isunfollow = false;
        //   // this.alluserlist();
        // } else {
        //   // this.isfollow = false;
        //   // this.isunfollow = false;
        //   // this.alluserlist();
        // }
      });
    } else {
      // this.isfollow = true;
      // this.isunfollow = true;
      // this.alluserlist();
    }
  }

  unfollow() {
    this.astro_id = (<HTMLInputElement>document.getElementById("astro_id")).value;
    if (this.astro_id != null && localStorage.getItem("token") != null) {
      this.followunfollowlistService.unfollow(this.astro_id).subscribe((data: any) => {
        this.followresponse = data;
        // console.log(this.followresponse.status);
        // if (this.followresponse.status === true) {
        //   this.isfollow = false;
        //   this.isunfollow = true;
        // } else {
        //   this.isfollow = false;
        //   this.isunfollow = true;
        // }
      });
    } else {
      // this.isfollow = true;
      // this.isunfollow = true;
    }
  }

}
