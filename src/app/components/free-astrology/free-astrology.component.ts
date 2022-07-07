import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-free-astrology',
  templateUrl: './free-astrology.component.html',
  styleUrls: ['./free-astrology.component.scss']
})
export class FreeAstrologyComponent implements OnInit {

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
