import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AstrologyService } from "../../services/astrology.service";

@Component({
  selector: 'app-astrology',
  templateUrl: './astrology.component.html',
  styleUrls: ['./astrology.component.scss']
})
export class AstrologyComponent implements OnInit {
  category_id: any = 1;
  listarr: any = [];
  item: any;
  result: any;
  subcat_id: any = 1;
  icon = [
    { img: 'https://www.onegodmed.com/front-assets/images/astrology.png' },
    { img: 'https://www.onegodmed.com/front-assets/images/numerology.png' },
    {img: 'https://www.onegodmed.com/front-assets/images/astrology.png'},
    {img: 'https://www.onegodmed.com/front-assets/images/astrology.png'},
    {img: 'https://www.onegodmed.com/front-assets/images/tarot.png'},
    {img: 'https://www.onegodmed.com/front-assets/images/astrology.png'},
    {img: 'https://www.onegodmed.com/front-assets/images/astrology.png'},
    {img: 'https://www.onegodmed.com/front-assets/images/tarot.png'},
    {img: 'https://www.onegodmed.com/front-assets/images/astrology.png'},
    {img: 'https://www.onegodmed.com/front-assets/images/numerology.png'},
    {img: 'https://www.onegodmed.com/front-assets/images/tarot.png'},
    {img: 'https://www.onegodmed.com/front-assets/images/numerology.png'},
    {img: 'https://www.onegodmed.com/front-assets/images/astrology.png'},
    {img: 'https://www.onegodmed.com/front-assets/images/numerology.png'},
    {img: 'https://www.onegodmed.com/front-assets/images/astrology.png'},
    {img: 'https://www.onegodmed.com/front-assets/images/tarot.png'},
  ]
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public astrologyService: AstrologyService
  ) {

  }



  ngOnInit() {
    this.astrologyService.astrologylist(this.category_id).subscribe((response: any) => {
      this.listarr = response.data;
      // this.item = response.data;
    });


    this.subcat_id = this.route.snapshot.params['id'] || null;

    if (this.subcat_id) {
      console.log(this.subcat_id);
      this.subcategory(this.subcat_id);
    }
  }




  subcategory(subcat_id : any) {
      // alert(subcat_id);
      this.astrologyService.astrology(subcat_id).subscribe((response: any) => {
      this.result = response.data[0].description;
      console.log(this.result);

    });
  }





}