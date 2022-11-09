import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-astrologer-call-popup',
  templateUrl: './astrologer-call-popup.component.html',
  styleUrls: ['./astrologer-call-popup.component.scss']
})
export class AstrologerCallPopupComponent implements OnInit {

  selected = 'Gender';

  time = {hour: 13, minute: 30, second: 0};
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;

  constructor() { }

  ngOnInit(): void {

  }


}
