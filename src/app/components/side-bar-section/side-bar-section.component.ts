import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-bar-section',
  templateUrl: './side-bar-section.component.html',
  styleUrls: ['./side-bar-section.component.scss']
})
export class SideBarSectionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  kundali(){
    this.router.navigateByUrl("/kundalipage");
  }
  matchmaking(){
    this.router.navigateByUrl("/matchmakingpage");
  }
  panchang(){
    this.router.navigateByUrl("/panchangpage");
  }
  horoscope(){
    this.router.navigateByUrl("/horoscopepage");
  }
  numerology(){
    this.router.navigateByUrl("/numerologypage");
  }

}
