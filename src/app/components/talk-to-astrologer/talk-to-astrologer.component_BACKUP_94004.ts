import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AstrologerCallPopupComponent } from 'src/app/shared/astrologer-call-popup/astrologer-call-popup.component';

@Component({
  selector: 'app-talk-to-astrologer',
  templateUrl: './talk-to-astrologer.component.html',
  styleUrls: ['./talk-to-astrologer.component.scss']
})
export class TalkToAstrologerComponent implements OnInit {
  isOpenpopup: boolean = false;

  toppings = new FormControl('');
  toppingList: string[] = ['Numerology', 'Vastu Shastra', 'Tarot Cards', 'Palmistry', 'Reiki Healing'];

  sortings = new FormControl('');
  sortingList: string[] = ['Price: High To Low', 'Price: Low To High', 'Rating: High To Low', 'Rating: Low To High', 'Exp: High To Low', 'Exp: High To Low'];
  
  states: string[] = [ 'Male', 'Female',];
  language: string[] = [ 'Hindi', 'English', 'Marathi', 'Tamil', ];

  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
<<<<<<< HEAD
=======

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

    // this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname).subscribe((data: any) => {
    //   this.totalcount = data;
    // })

    this.alluserlist();
    // this.followunfollowlistService.getfollowlist();

    // this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname).subscribe((data: any) => {
    //  this.astrolist.data = data.data;
    //   console.log('====>',this.astrolist.data);
    // })


>>>>>>> staging
  }

  onclickOpenpopup(){
    this.isOpenpopup = true;
  }

  openDialog() {
    this.dialog.open(AstrologerCallPopupComponent);
  }

<<<<<<< HEAD
=======
  logindialogopen(astroIdforcall: any) {
    this.dialog.open(SingUpPopupComponent, {
      data: { astroIdforcall }
    });
  }

  alluserlist() {
    this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname).subscribe((data: any) => {
      if (this.followerlist.status) {
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
      } else {
        this.astrolist.data = data.data
      }
    });

  }

  trackByFn(index: any, item: any) {
    // if (item.followed == true) {
    //   item.followed = true;
    // }else{
    //   item.followed = false;
    // }
    return item;
  }

  // follow(id: any) {
  //   this.astro_id = (<HTMLInputElement>document.getElementById("astro_id")).value;
  //   if (this.astro_id != null && localStorage.getItem("token") != null) {
  //     this.followunfollowlistService.follow(this.astro_id).subscribe((data: any) => {
  //       this.followresponse = data;
  //       console.log(this.followresponse);
  //       if (this.followresponse.status === true) {
  //         this.isfollow = true;
  //         this.isunfollow = false;
  //         window.location.href = 'talktoastro';
  //       } else {
  //         this.isfollow = false;
  //         this.isunfollow = false;
          
  //       }
  //     });
  //   } else {
  //     this.isfollow = true;
  //     this.isunfollow = true;
  //     this.alluserlist();
  //   }
   
  // }

  // unfollow(id: any) {
  //   this.astro_id = id;
  //   console.log(this.astro_id);
  //   if (this.astro_id != null && localStorage.getItem("token") != null) {
  //     this.followunfollowlistService.unfollow(this.astro_id).subscribe((data: any) => {
  //       this.followresponse = data;
        
  //       console.log(this.followresponse);
  //       if (this.followresponse.status === true) {
  //         this.isfollow = false;
  //         this.isunfollow = true;
  //         window.location.href = 'talktoastro';
  //       } else {
  //         this.isfollow = false;
  //         this.isunfollow = true;
         
  //       }
  //     });
  //   } else {
  //     this.isfollow = true;
  //     this.isunfollow = true;
  //     this.alluserlist();
  //   }
   
  // }



  follow(id: any) {
    // this.astro_id = (<HTMLInputElement>document.getElementById("astro_id")).value;
    this.astro_id = id;
    console.log(this.astro_id);
    
    if (this.astro_id != null && localStorage.getItem("token") != null) {
      this.followunfollowlistService.follow(this.astro_id).subscribe((data: any) => {
        this.followresponse = data;
        console.log(this.followresponse);
        if (this.followresponse.status == true) {
          this.isfollow = true;
          this.isunfollow = false;
          window.location.href = 'talktoastro';
        } else {
          this.isfollow = false;
          this.isunfollow = false;
          
        }
      });
    } else {
      this.isfollow = true;
      this.isunfollow = true;
      this.alluserlist();
    }
   
  }

  unfollow(id: any) {
    this.astro_id = id;
    console.log(this.astro_id);
    if (this.astro_id != null && localStorage.getItem("token") != null) {
      this.followunfollowlistService.unfollow(this.astro_id).subscribe((data: any) => {
        this.followresponse = data;
        
        console.log(this.followresponse);
        if (this.followresponse.status === true) {
          this.isfollow = false;
          this.isunfollow = true;
          window.location.href = 'talktoastro';
        } else {
          this.isfollow = false;
          this.isunfollow = true;
         
        }
      });
    } else {
      this.isfollow = true;
      this.isunfollow = true;
      this.alluserlist();
    }
   
  }

  changefilter(value: any) {
    this.categoryfilter = value;
    this.alluserlist();
    // this.astrologerlistService.astrolist(this.page, this.categoryfilter, this.sortingfilter, this.searchbyname);
  }

  sortingchangefilter(value: any) {
    if (value === 'Price: High To Low') {
      this.sortingfilter = { field: 'price', sortby: 'DESC' }
    } else {
      this.sortingfilter = { field: 'price', sortby: 'ASC' }
    }

    if (value === 'Rating: High To Low') {
      this.sortingfilter = { field: 'rating', sortby: 'ASC' }
    } else {
      this.sortingfilter = { field: 'rating', sortby: 'DESC' }
    }

    if (value === 'Exp: High To Low') {
      this.sortingfilter = { field: 'experience', sortby: 'DESC' }
    } else {
      this.sortingfilter = { field: 'experience', sortby: 'ASC' }
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
>>>>>>> staging
}
