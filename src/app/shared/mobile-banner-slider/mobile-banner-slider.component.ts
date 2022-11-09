import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-banner-slider',
  templateUrl: './mobile-banner-slider.component.html',
  styleUrls: ['./mobile-banner-slider.component.scss']
})
export class MobileBannerSliderComponent implements OnInit {

  slides = [
    {img: "https://www.onegodmed.com/front-assets/images/CONFUSE-ABOUT-CAREER-banner.png"},
    {img: "https://www.onegodmed.com/front-assets/images/panchang-banner.png"},
    {img: "https://www.onegodmed.com/front-assets/images/best-life-partner-banner.png"},
    {img: "https://www.onegodmed.com/admin-assets/assets/blog-images/vastu_plant_in_door_(1).jpg"},
    {img: "https://www.onegodmed.com/admin-assets/assets/blog-images/krishna_janmastami.jpg"},
    {img: "https://www.onegodmed.com/admin-assets/assets/blog-images/vastu_plant_in_door_(1).jpg"},
    {img: "https://www.onegodmed.com/assets/categories_image/Career_Astrology_Onegodmed.jpg"}
  ];
  
  slideMobileConfig : any = null;

  constructor() { }

  ngOnInit(): void {

    this.slideMobileConfig = {
      infinite: true,
      slidesToScroll: 1,
      slidesToShow: 5,
      speed: 5000,
      draggable: true,
      centerMode: true,
      variableWidth: true,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnFocus: false,
      pauseOnHover: false,
      dots: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            centerPadding: '60px',
            arrows: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            centerPadding: '10px',
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            centerPadding: '5px',
          }
        }
      ]
    };

  }

}
