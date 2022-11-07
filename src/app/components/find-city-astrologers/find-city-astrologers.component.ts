import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AstrologerlistService } from "../../services/astrologerlist.service";
import { FollounfollowService } from "../../services/follounfollow.service";


@Component({
  selector: 'app-find-city-astrologers',
  templateUrl: './find-city-astrologers.component.html',
  styleUrls: ['./find-city-astrologers.component.scss']
})
export class FindCityAstrologersComponent implements OnInit {
  @Output() category: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, public astrologerlistService: AstrologerlistService) { }

  ngOnInit(): void {
  }

  onclick(categoryfilter: any){
    this.category.emit(categoryfilter);
  }

}
