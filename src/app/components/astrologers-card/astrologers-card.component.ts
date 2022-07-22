import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FollounfollowService } from "../../services/follounfollow.service";

@Component({
  selector: 'app-astrologers-card',
  templateUrl: './astrologers-card.component.html',
  styleUrls: ['./astrologers-card.component.scss']
})
export class AstrologersCardComponent implements OnInit {

  followedastro: any = [];

  constructor(private router: Router, public followunfollowlistService: FollounfollowService) { }

  ngOnInit(): void {
    this.followunfollowlistService.getfollowlist();
  }

  astrodetailspage(id: any) {
    // alert(id);
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
