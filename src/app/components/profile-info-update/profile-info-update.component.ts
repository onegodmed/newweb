import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CscService } from 'src/app/services/csc.service';
import { OrderService } from 'src/app/services/order.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile-info-update',
  templateUrl: './profile-info-update.component.html',
  styleUrls: ['./profile-info-update.component.scss']
})
export class ProfileInfoUpdateComponent implements OnInit {

  editprofileshow: boolean = false;
  editprofilehide: boolean = false;
  selectedimage: any = '';
  username: any;
  country_id: any;
  state_id: any;
  mybooking: any = [];
  countrylist: any = [];
  statelist: any = [];
  citylist: any = [];
  transactionlist: any = [];
  userProfiledetails: any = [];
  userProfileform: any = [];
  getcities: any = [];
  selectedcityname: any;
  errormessageforfullname: any = '';
  errormessageforbirthplace: any = '';

  constructor(public dialog: MatDialog, private router: Router, public orderService: OrderService, public transactionService: TransactionService, public userService: UserService, public cscservice: CscService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['']);
    } else {
      // this.username = localStorage.getItem('UserName');
      // this.userService.userWalletdetails().subscribe((data: any) => {
      //   this.CurrentBalance = data;
      // });

      this.userService.userProfiledetails().subscribe((data: any) => {
        this.userProfiledetails = data;
        console.log(this.userProfiledetails);
      });

      this.orderService.mybooking().subscribe((data: any) => {
        this.mybooking = data;
        // console.log(this.mybooking);
      });

      this.transactionService.transactionlist().subscribe((data: any) => {
        this.transactionlist = data;
        // console.log(this.transactionlist);
      });
    }
  }

  showEditprofile() {
    this.editprofileshow = true;
    this.editprofilehide = true;
  }

  onFileSelected(e: any) {
    // this.selectedimage = (<HTMLInputElement>document.getElementById("userimage")).value;
    this.selectedimage = e.target.files[0].name;
  }

  updateEditprofile() {
    this.userProfileform = [
      {
        fullname: (<HTMLInputElement>document.getElementById("username")).value,
        // mobile: (<HTMLInputElement>document.getElementById("usermobilenumber")).value,
        email: (<HTMLInputElement>document.getElementById("useremail")).value,
        gender: (<HTMLInputElement>document.getElementById("gender")).value,
        address: (<HTMLInputElement>document.getElementById("useraddress")).value,
        dob: (<HTMLInputElement>document.getElementById("day")).value + '/' + (<HTMLInputElement>document.getElementById("months")).value + '/' + (<HTMLInputElement>document.getElementById("Year")).value,
        birthtime: (<HTMLInputElement>document.getElementById("hour")).value + ':' + (<HTMLInputElement>document.getElementById("minute")).value + ' ' + (<HTMLInputElement>document.getElementById("am")).value,
        birthplace: (<HTMLInputElement>document.getElementById("searchcity")).value,
        image: this.selectedimage
      }
    ];

    if (this.userProfileform[0].image == '') {
      this.userProfileform[0].image = this.userProfiledetails.data.image_name;
    } else{
      this.userProfileform[0].image = this.selectedimage;
    }

    if (this.userProfileform[0].fullname == '') {
      this.errormessageforfullname = 'Full Name is Required!';
      this.flash();
    } else if (this.userProfileform[0].birthplace == '') {
      this.errormessageforbirthplace = 'Birth Place is required!';
      this.flash();
    }else {
      this.userService.updateprofile(this.userProfileform).subscribe((data: any) => {
        this.userProfiledetails = data;
        console.log(this.userProfiledetails);
      });
      // console.log(this.userProfileform);
    }

  }

  getCity() {
    let search = (<HTMLInputElement>document.getElementById("searchcity")).value;
    if (search.length >= 3) {
      this.userService.getCity(search).subscribe((data: any) => {
        this.getcities = data;
      });
    }
  }

  selectcity(cityname: any = []) {
    if (this.getcities != '') {
      this.selectedcityname = cityname;
      this.getcities = null;
    }
  }

  flash() {
    setTimeout(() => {
      this.errormessageforfullname = '';
      this.errormessageforbirthplace = '';
    }, 3000);
  }

}
