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
  }

  onclickOpenpopup(){
    this.isOpenpopup = true;
  }

  openDialog() {
    this.dialog.open(AstrologerCallPopupComponent);
  }

}
