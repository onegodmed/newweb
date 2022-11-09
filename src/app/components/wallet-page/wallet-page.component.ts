import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProcessPayPopupComponent } from 'src/app/shared/process-pay-popup/process-pay-popup.component';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.scss']
})
export class WalletPageComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    this.dialog.open(ProcessPayPopupComponent);
  }

}
