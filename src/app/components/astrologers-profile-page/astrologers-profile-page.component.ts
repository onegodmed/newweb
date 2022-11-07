import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AstrologerlistService } from "src/app/services/astrologerlist.service";
import { FollounfollowService } from "src/app/services/follounfollow.service";
import { RatingsService } from "src/app/services/ratings.service";
import { MatDialog } from '@angular/material/dialog';
import { AstrologerCallPopupComponent } from 'src/app/shared/astrologer-call-popup/astrologer-call-popup.component';
import { count } from 'rxjs/operators';
import { SingUpPopupComponent } from 'src/app/shared/sing-up-popup/sing-up-popup.component';

@Component({
  selector: 'app-astrologers-profile-page',
  templateUrl: './astrologers-profile-page.component.html',
  styleUrls: ['./astrologers-profile-page.component.scss']
})
export class AstrologersProfilePageComponent implements OnInit {
  IsLoggedIn: boolean = false;
  astrodetails: any = [];
  astroratingsall: any = [];
  availability: any = [];
  followerslist: any = [];
  reviewratingdata: any = [];
  sunday: any = [];
  monday: any = [];
  tuesday: any = [];
  wednesday: any = [];
  thursday: any = [];
  friday: any = [];
  saturday: any = [];
  token = localStorage.getItem('token');
  ratingsonly: any;
  reviewsonly: any;
  totalfollowers: any;
  ratingreviewmsg: any;

  isfollow: boolean = false;
  isShown: boolean = false;
  isSussessfully: boolean = false;

  constructor(private router: Router, public astrologerlistService: AstrologerlistService, public dialog: MatDialog, public followunfollowlistService: FollounfollowService, public ratingsService: RatingsService) { }


  ngOnInit(): void {

    if (localStorage.getItem('token') != null) {
      this.IsLoggedIn = true;
    } else {
      this.IsLoggedIn = false;
    }
    //For Astologer Details//
    this.astrologerlistService.astrodetails().subscribe((data: any) => {
      this.astrodetails = data;
      // console.log('---------->',this.astrodetails);
      this.totalfollowers = this.astrodetails.data.followers;
    });
    //For Ratings//
    this.ratingsService.astroratings().subscribe((data: any) => {
      this.astroratingsall = data;
    });

    //For Followerslist///
    this.followunfollowlistService.getfollowlist().subscribe((data: any) => {
      this.followerslist = data;
      // console.log(this.followerslist);
      for (var val of this.followerslist.data) {
        if(this.astrodetails.data.astrologer_id == val){
          this.isfollow = true;
        }else{
          this.isfollow = false;
        }
      }

    });
    //For Availability//
    this.astrologerlistService.checkavailability().subscribe((data: any) => {
      this.availability = data;
      if (this.availability.status === true) {
        if (this.availability.data[0].Sun != '') {
          this.sunday = this.availability.data[0].Sun.split(',');
        } else {
          this.sunday = [];
        }
        if (this.availability.data[0].Mon != '') {
          this.monday = this.availability.data[0].Mon.split(',');
        } else {
          this.monday = [];
        }
        if (this.availability.data[0].Tue != '') {
          this.tuesday = this.availability.data[0].Tue.split(',');
        } else {
          this.tuesday = [];
        }
        if (this.availability.data[0].Wed != '') {
          this.wednesday = this.availability.data[0].Wed.split(',');
        } else {
          this.wednesday = [];
        }
        if (this.availability.data[0].Thu != '') {
          this.thursday = this.availability.data[0].Thu.split(',');
        } else {
          this.thursday = [];
        }
        if (this.availability.data[0].Fri != '') {
          this.friday = this.availability.data[0].Fri.split(',');
        } else {
          this.friday = [];
        }
        if (this.availability.data[0].Sat != '') {
          this.saturday = this.availability.data[0].Sat.split(',');
        } else {
          this.saturday = [];
        }
      } else {
        this.availability = [];
      }
    });
  }

  addratingsreviews() {
    this.reviewsonly = (<HTMLInputElement>document.getElementById("addreviewsonly")).value;
    // alert(this.ratingsonly);
    if (this.ratingsonly != null) {
      this.ratingsService.addreviewRating(this.reviewsonly, this.ratingsonly).subscribe((data: any) => {
        this.reviewratingdata = data;
        if (this.reviewratingdata.status == true) {
          this.isSussessfully = true;
          this.ratingreviewmsg = this.reviewratingdata.message;
          (<HTMLInputElement>document.getElementById("addreviewsonly")).value = '';
        } else {
          this.isSussessfully = true;
          this.ratingreviewmsg = "something wrong with network";
        }
      });
    } else {
      this.isSussessfully = true;
      this.ratingreviewmsg = "Ratings required";
    }
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  openDialogforcall(astroIdforcall: any) {
    this.dialog.open(AstrologerCallPopupComponent, {
      data: { astroIdforcall }
    });
  }

  openDialogforchat(astroIdforchat: any) {
    this.dialog.open(AstrologerCallPopupComponent, {
      data: { astroIdforchat }
    });
  }

  addratingsonly(ratings: any) {
    if (ratings != '') {
      this.ratingsonly = ratings;
      // alert(this.ratingsonly);
    } else {
      this.ratingsonly = '';
    }
  }

  follow(astro_id: any){
    this.followunfollowlistService.follow(astro_id).subscribe((data: any) => {
      console.log('followdata',data);
      if(data.status){
        this.isfollow = true;
        this.totalfollowers += 1;
      }else{
        this.isfollow = false;
      }
    });
  }

  unfollow(astro_id: any){
    this.followunfollowlistService.unfollow(astro_id).subscribe((data: any) => {
      console.log('followdata',data);
      if(data.status){
        this.isfollow = false;
        this.totalfollowers -= 1;
      }else{
        this.isfollow = true;
      }
    });
  }

  logindialogopen(astroIdforcall: any) {
    this.dialog.open(SingUpPopupComponent, {
      data: { astroIdforcall }
    });
  }



}
