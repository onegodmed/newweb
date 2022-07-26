import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Inject } from '@angular/core';
import { AstrologerlistService } from "../../services/astrologerlist.service";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-astrologer-call-popup',
  templateUrl: './astrologer-call-popup.component.html',
  styleUrls: ['./astrologer-call-popup.component.scss']
})
export class AstrologerCallPopupComponent implements OnInit {

  selected = 'Gender';
  astrodetails: any = [];
  time = {hour: 13, minute: 30, second: 0};
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;
  show: boolean = true;
  hide: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public astrologerlistService: AstrologerlistService) { }

  ngOnInit(): void {
    // alert(this.data.astroId);
    this.astrologerlistService.astrodetailspopup(this.data.astroId).subscribe((data: any) => {
      this.astrodetails = data;
      console.log(this.astrodetails)
    });
  }


}
