import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChatScreenComponent } from 'src/app/shared/chat-screen/chat-screen.component';

@Component({
  selector: 'app-chat-with-astrologer',
  templateUrl: './chat-with-astrologer.component.html',
  styleUrls: ['./chat-with-astrologer.component.scss']
})
export class ChatWithAstrologerComponent implements OnInit {
  isOpenpopup: boolean = false;

  toppings = new FormControl('');
  toppingList: string[] = ['Numerology', 'Vastu Shastra', 'Tarot Cards', 'Palmistry', 'Reiki Healing'];

  sortings = new FormControl('');
  sortingList: string[] = ['Price: High To Low', 'Price: Low To High', 'Rating: High To Low', 'Rating: Low To High', 'Exp: High To Low', 'Exp: High To Low'];
  
  states: string[] = [ 'Male', 'Female',];
  language: string[] = [ 'Hindi', 'English', 'Marathi', 'Tamil', ];
  

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  onclickOpenpopup(){
    this.isOpenpopup = true;
  }

  openchatpage() {
    this.router.navigateByUrl("/chatscreen");
  }

}
