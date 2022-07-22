import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AstrologerlistService } from "../../services/astrologerlist.service";
import { FollounfollowService } from "../../services/follounfollow.service";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@Component({
  selector: 'app-talk-to-astrologer',
  templateUrl: './talk-to-astrologer.component.html',
  styleUrls: ['./talk-to-astrologer.component.scss']
})
export class TalkToAstrologerComponent implements OnInit {
  page: number = 1;
  astro_id: any = '';
  followresponse: any = {};
  categoryfilter: any = [];
  sortingfilter: any;
  searchbyname: any;
  isfollow: any;
  isunfollow: boolean = true;
  toppings = new FormControl('');
  toppingList: string[] = ['Numerology', 'Vastu Shastra', 'Tarot Cards', 'Palmistry', 'Reiki Healing'];

  sortings = new FormControl('');
  sortingList: string[] = ['Price: High To Low', 'Price: Low To High', 'Rating: High To Low', 'Rating: Low To High', 'Exp: High To Low', 'Exp: High To Low'];


  constructor(private router: Router, public astrologerlistService: AstrologerlistService, public followunfollowlistService: FollounfollowService) { }

  ngOnInit(): void {
    this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname);
    this.followunfollowlistService.getfollowlist();

    // window.addEventListener('scroll', this.scrollEvent, true);

    // this.followunfollowlistService.getfollowlist().subscribe((data) => {
    //   this.followresponse = data;
    //   console.log(this.followresponse.status);
    // })
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event: any): void => {
    // const scrollTopVal = event.target.scrollingElement.scrollTop;
    // console.log(scrollTopVal);
    this.getdata();
  }

  getdata() {
    console.log("Scrolled");
    this.page = this.page + 1;
    this.astrologerlistService.loadmorelist(this.page, this.categoryfilter, this.sortingfilter);
  }

  // follow() {
  //   this.astro_id = (<HTMLInputElement>document.getElementById("astro_id")).value;
  //   console.log(this.astro_id);
  //   this.followunfollowlistService.follow(this.astro_id);
  // }

  follow() {
    this.astro_id = (<HTMLInputElement>document.getElementById("astro_id")).value;
    console.log(localStorage.getItem("token"));
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
    console.log(localStorage.getItem("token"));
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
    this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname);
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
}
