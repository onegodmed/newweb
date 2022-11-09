import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs-online-astrologers',
  templateUrl: './tabs-online-astrologers.component.html',
  styleUrls: ['./tabs-online-astrologers.component.scss']
})
export class TabsOnlineAstrologersComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void { 

  }



}
