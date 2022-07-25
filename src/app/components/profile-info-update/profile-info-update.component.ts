import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-info-update',
  templateUrl: './profile-info-update.component.html',
  styleUrls: ['./profile-info-update.component.scss']
})
export class ProfileInfoUpdateComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }



}
