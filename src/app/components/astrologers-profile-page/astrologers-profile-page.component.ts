import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AstrologerlistService } from "../../services/astrologerlist.service";
import { FollounfollowService } from "../../services/follounfollow.service";
import { RatingsService } from "../../services/ratings.service";
import { MatDialog } from '@angular/material/dialog';
import { AstrologerCallPopupComponent } from 'src/app/shared/astrologer-call-popup/astrologer-call-popup.component';

@Component({
  selector: 'app-astrologers-profile-page',
  templateUrl: './astrologers-profile-page.component.html',
  styleUrls: ['./astrologers-profile-page.component.scss']
})
export class AstrologersProfilePageComponent implements OnInit {
  astrodetails: any = [];
  astroratingsall: any = [];
  availability: any = [];
  sunday: any = [];
  monday: any = [];
  tuesday: any = [];
  wednesday: any = [];
  thursday: any = [];
  friday: any = [];
  saturday: any = [];
  token = localStorage.getItem('token');

  isShown: boolean = false;
  isSussessfully: boolean = false;

  constructor(private router: Router, public astrologerlistService: AstrologerlistService, public dialog: MatDialog, public followunfollowlistService: FollounfollowService, public ratingsService: RatingsService) { }


  ngOnInit(): void {
    //For Astologer Details//
    this.astrologerlistService.astrodetails().subscribe((data: any) => {
      this.astrodetails = data;
    });
    //For Ratings//
    this.ratingsService.astroratings().subscribe((data: any) => {
      this.astroratingsall = data;
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

  submitBtn() {
    this.isSussessfully = true;
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  openDialog(astroIdforcall: any) {
    this.dialog.open(AstrologerCallPopupComponent, {
      data: { astroIdforcall }
    });
  }



}
