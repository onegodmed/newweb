import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { ProcessPayPopupComponent } from 'src/app/shared/process-pay-popup/process-pay-popup.component';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss']
})
export class WalletPageComponent implements OnInit {
  packagelist: any = [];
  balance: any = [];
  walletimg = [
    {img: "../../assets/images/blueback.png"},
    {img: "../../assets/images/greenback.png"},
    {img: "../../assets/images/redback.png"},
    {img: "../../assets/images/blueback.png"},
    {img: "../../assets/images/greenback.png"},
    {img: "../../assets/images/redback.png"},
    {img: "../../assets/images/blueback.png"},
    {img: "../../assets/images/greenback.png"},
    {img: "../../assets/images/greenback.png"}
  ];

  constructor(private router: Router, public dialog: MatDialog, public packagelistService: PackageService) { }

  ngOnInit(): void {
    if(localStorage.getItem('CurrentBalance') != ''){
      this.balance = localStorage.getItem('CurrentBalance');
    }else{
      this.balance = [];
    }
    this.packagelistService.packagelist().subscribe((data: any) => {
      this.packagelist = data;
    });
  }

  openDialog(){
    this.dialog.open(ProcessPayPopupComponent);
  }

  setpackageid(id: any){
    if(localStorage.getItem('token') != null){
      if(localStorage.getItem('packageId') != null){
        localStorage.setItem('packageId', id);
      }else{
      localStorage.setItem('packageId', id);
      }
    }else{
      localStorage.removeItem('packageId');
    }
  }

}
