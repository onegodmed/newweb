import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  myNumber: number = 10;
  openInNewTab = true;
  activeIndex: any;
  selectedItem = 0;
  count = 2;
  items = [
    {
      value: 'Call',
      img: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-call-web-store-flaticons-lineal-color-flat-icons.png',
      path: '/talktoastro',
    },
    {
      value: 'Chat',
      img: 'https://img.icons8.com/color/48/FFFFFF/communication.png',
      path: '',
    },
    {
      value: 'Astrologer',
      img: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-astronomy-online-education-flaticons-lineal-color-flat-icons.png',
      path: '',
    },
    {
      value: 'Blog',
      img: 'https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-blogging-home-based-business-flaticons-flat-flat-icons.png',
      path: '',
    },
    {
      value: 'Profile',
      img: 'https://img.icons8.com/color/48/000000/guest-male--v1.png',
      path: '',
    },
  ];

  constructor(private router: Router, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {

  }
  setActiveIndex(index: any) {
    this.activeIndex = index;
  }
  getActiveClass(i: any) {
    return this.activeIndex == i ? 'active' : '';
  }


}
