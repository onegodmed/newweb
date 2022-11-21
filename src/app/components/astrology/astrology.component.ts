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
  route1() {
    this.router.navigateByUrl("/talktoastro");
  }

  route2() {
    this.router.navigateByUrl("vedic-astrology/business-astrology/");
  }
  route3() {
    this.router.navigateByUrl("vedic-astrology/career-&-education/");
  }
  route4() {
    this.router.navigateByUrl("vedic-astrology/marriage-prediction/");
  }
  route5() {
    this.router.navigateByUrl("vedic-astrology/relationship-&-compatibility/");
  }
  route6() {
    this.router.navigateByUrl("vedic-astrology/wealth-&-property/");
  }
  route7() {
    this.router.navigateByUrl("vedic-astrology/family-consultation/");
  }

  route8() {
    this.router.navigateByUrl("vedic-astrology/medical-astrology/");
  }
  route9() {
    this.router.navigateByUrl("vedic-astrology/numerology/");
  }
  route10() {
    this.router.navigateByUrl("vedic-astrology/vastu-shastra/");
  }
  route11() {
    this.router.navigateByUrl("vedic-astrology/tarot-cards/");
  }
  route12() {
    this.router.navigateByUrl("vedic-astrology/palmistry/");
  }
  
 





}