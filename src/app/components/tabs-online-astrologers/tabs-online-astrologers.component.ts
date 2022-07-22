import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeastrologerlistService } from "../../services/homeastrologerlist.service";


@Component({
  selector: 'app-tabs-online-astrologers',
  templateUrl: './tabs-online-astrologers.component.html',
  styleUrls: ['./tabs-online-astrologers.component.scss']
})
export class TabsOnlineAstrologersComponent implements OnInit {

  constructor(private router: Router, public astrologerlistService: HomeastrologerlistService) { }

  ngOnInit(): void {
    this.astrologerlistService.homeastrolist();
  }

  astrodetailspage(id: any) {
    if (id != null) {
      if (localStorage.getItem('astrologer_id') != null) {
        localStorage.setItem('astrologer_id', id);
      } else {
        localStorage.setItem('astrologer_id', id);
      }
      this.router.navigateByUrl('/profileastrologer');
    } else {
      alert('Astrologer Id Required');
    }
  }
  

}
