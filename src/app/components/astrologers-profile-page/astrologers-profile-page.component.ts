import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-astrologers-profile-page',
  templateUrl: './astrologers-profile-page.component.html',
  styleUrls: ['./astrologers-profile-page.component.scss']
})
export class AstrologersProfilePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}