import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { ProcessPayPopupComponent } from 'src/app/shared/process-pay-popup/process-pay-popup.component';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss']
})
export class WalletPageComponent implements OnInit {
  packagelist: any = [];
  balance: any = [];
  walletimg = [
    { img: "../../assets/images/blueback.png" },
    { img: "../../assets/images/greenback.png" },
    { img: "../../assets/images/redback.png" },
    { img: "../../assets/images/blueback.png" },
    { img: "../../assets/images/greenback.png" },
    { img: "../../assets/images/redback.png" },
    { img: "../../assets/images/blueback.png" },
    { img: "../../assets/images/greenback.png" },
    { img: "../../assets/images/greenback.png" }
  ];

  constructor(private router: Router, public dialog: MatDialog, public packagelistService: PackageService, public userService: UserService) { }

  ngOnInit(): void {
    // if(localStorage.getItem('CurrentBalance') != ''){
    //   this.balance = localStorage.getItem('CurrentBalance');
    // }else{
    //   this.balance = [];
    // }
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['']);
    } else {
      this.userService.userWalletdetails().subscribe((data: any) => {
        this.balance = data;
      });

      this.packagelistService.packagelist().subscribe((data: any) => {
        this.packagelist = data;
      });
    }
  }

  openDialog(packageId: any) {
    this.dialog.open(ProcessPayPopupComponent, {
      data: { packageId }
    });
  }

  // setpackageid(id: any){
  //   if(localStorage.getItem('token') != null){
  //     if(localStorage.getItem('packageId') != null){
  //       localStorage.setItem('packageId', id);
  //     }else{
  //     localStorage.setItem('packageId', id);
  //     }
  //   }else{
  //     localStorage.removeItem('packageId');
  //   }
  // }

}
