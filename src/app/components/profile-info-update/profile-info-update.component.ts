import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CscService } from 'src/app/services/csc.service';
import { OrderService } from 'src/app/services/order.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { FollounfollowService } from 'src/app/services/follounfollow.service';



import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';



const headers = new HttpHeaders()
  .set('Access-Control-Allow-Origin', '*')
  .set('content-type', 'application/json')
  .set('content-type', 'application/x-www-form-urlencoded');


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
  totalBooking:any=0;
  totalInvoice:any=0;
  followinglist:any=[]

  constructor(public dialog: MatDialog, private router: Router, public orderService: OrderService, public transactionService: TransactionService, public userService: UserService, public cscservice: CscService, public FollowingService: FollounfollowService) { }

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

        console.log('current profile data==>>>>',this.userProfiledetails);
      });

      this.orderService.mybooking().subscribe((data: any) => {
        this.mybooking = data;
        this.totalBooking = data.data.length;
        console.log('all darta of booking',this.mybooking);
      });

      this.transactionService.transactionlist().subscribe((data: any) => {
        this.transactionlist = data;
        this.totalInvoice = data.data.length;
         console.log('all transactions ===>>>',this.transactionlist);
      });



      this.FollowingService.getfollowlist().subscribe((data: any) => {
        this.followinglist = data;
       // this.totalInvoice = data.data.length;
         console.log('all following ===>>>',this.followinglist);
      });
      

 




    }
  }

  showEditprofile() {
    this.editprofileshow = true;
    this.editprofilehide = true;
  }

  onFileSelected(e: any) {
    // this.selectedimage = (<HTMLInputElement>document.getElementById("userimage")).value;
    this.selectedimage = e.target.files[0];
  }

  updateEditprofile() {
    this.userProfileform = [
      {
        fullname: (<HTMLInputElement>document.getElementById("username")).value,
        // mobile: (<HTMLInputElement>document.getElementById("usermobilenumber")).value,
        email: (<HTMLInputElement>document.getElementById("useremail")).value,
        gender: (<HTMLInputElement>document.getElementById("gender")).value,
        address: (<HTMLInputElement>document.getElementById("useraddress")).value,
        //dob: (<HTMLInputElement>document.getElementById("day")).value + '/' + (<HTMLInputElement>document.getElementById("months")).value + '/' + (<HTMLInputElement>document.getElementById("Year")).value,
        dob: (<HTMLInputElement>document.getElementById("dob")).value,
        //birthtime: (<HTMLInputElement>document.getElementById("hour")).value + ':' + (<HTMLInputElement>document.getElementById("minute")).value + ' ' + (<HTMLInputElement>document.getElementById("am")).value,
        birthtime: (<HTMLInputElement>document.getElementById("timeOfBirth")).value,
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

      var updatedData = {
                          "headers": headers,
                          "token"  : localStorage.getItem('token')
                        }
      if(this.userProfileform[0].fullname!=''){
       Object.assign(updatedData, {name:this.userProfileform[0].fullname});
      }
      if(this.userProfileform[0].email!=''){
        Object.assign(updatedData, {email:this.userProfileform[0].email});
       }
       if(this.userProfileform[0].gender!=''){
        Object.assign(updatedData, {gender:this.userProfileform[0].gender});
       }
       if(this.userProfileform[0].address!='' && this.userProfileform[0].address!='undefined'){
        Object.assign(updatedData, {address:this.userProfileform[0].address});
       }
       if(this.userProfileform[0].dob!='' && this.userProfileform[0].dob!='Day/Months/Year'){
        Object.assign(updatedData, {dateOfBirth:this.userProfileform[0].dob});
       }
      //  if(this.userProfileform[0].birthtime!='' && this.userProfileform[0].birthtime!='Hour:Minute am'){
      //   Object.assign(updatedData, {timeOfBirth:this.userProfileform[0].birthtime});
      //  }
       
       if(this.userProfileform[0].birthplace!=''){
        Object.assign(updatedData, {birthplace:this.userProfileform[0].birthplace});
       }
       if(this.userProfileform[0].image!='' && this.userProfileform[0].image!=undefined){
        //Object.assign(updatedData, {image:this.selectedimage});
       }


      // console.log('updated data=>>>>', updatedData);
      // return;

      this.userService.updateprofile(updatedData).subscribe((data: any) => {
        //this.userProfiledetails = data;
        // console.log(this.userProfiledetails);
        // return
        if(data.status){
          alert(data.message)
          window.location.reload();
        }else{
          alert('Something went wrong plz try again')
        }
       
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

  // myBooking(){
  //  this.orderService.mybooking().subscribe((data:any)=>{

  //  });
  // }

}
