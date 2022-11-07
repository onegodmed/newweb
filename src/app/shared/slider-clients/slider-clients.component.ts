import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TestimonialService } from "../../services/testimonial.service";


@Component({
  selector: 'app-slider-clients',
  templateUrl: './slider-clients.component.html',
  styleUrls: ['./slider-clients.component.scss']
})
export class SliderClientsComponent implements OnInit {
  testimoniallist: any = [];
  rating: boolean = false;

  slides = [
    {img: "https://www.onegodmed.com/admin-assets/assets/images/testimonials/Rohit1.jpeg" , title: "one tow", designation: "J.Engineer", subtitle: "Very helpful and interesting very talented astrologers .something that can help to know ourselves better." , hadding: "Very helpful and interesting very talented astrologers",},
    {img: "https://uploads-ssl.webflow.com/60f8225c1867f5804f11d289/61461e7c3543ef5da0fc0824_weblarge_Gem.jpg", title: "for is slide4",designation: "Engineer", subtitle: "Very helpful and interesting very talented astrologers ....,that can help to know ourselves better.", hadding: "Very helpful and interesting very talented astrologers",},
    {img: "https://uploads-ssl.webflow.com/60f8225c1867f5804f11d289/61461e91c0904598d0980190_weblarge_Leo.jpg", title: "one is slider2",designation: "Product Engineer", subtitle: "Very helpful and interesting very talented Who we can help to know ourselves better.", hadding: "Very helpful and interesting very talented astrologers",},
    {img: "https://uploads-ssl.webflow.com/60f8225c1867f5804f11d289/61461e7c3543ef5da0fc0824_weblarge_Gem.jpg" , title: "this is slider",designation: "SDE-2", subtitle: "Very helpful and interesting very talented astrologers ....affordable ....something that can help to know ourselves better.", hadding: "Very helpful and interesting very talented astrologers",},
    {img: "https://uploads-ssl.webflow.com/60f8225c1867f5804f11d289/61461ea175c7457dcb41d746_weblarge_Scorp.jpg" , title: "Shiv Kumar",designation: "Ui Developer", subtitle: "Very helpful and interesting very talented astrologers ....affordable ....something that can help to know ourselves better.", hadding: "Very helpful and interesting very talented astrologers",},
    {img: "https://uploads-ssl.webflow.com/60f8225c1867f5804f11d289/61461e7c3543ef5da0fc0824_weblarge_Gem.jpg" , title: "Rohit Malik",designation: "Web", subtitle: "Very helpful and interesting very talented astrologers ....at...time to something that can help to know me.", hadding: "Very helpful and interesting very talented astrologers",}
  ];
  
  slideClientsConfig : any = null;

  constructor(private router: Router, public testimoniallistService: TestimonialService) { }

  ngOnInit(): void {

    this.testimoniallistService.testimonial().subscribe((data: any) => {
      this.testimoniallist = data;
    });

    this.slideClientsConfig = {
      infinite: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      speed: 5000,
      draggable: true,
      centerMode: true,
      // variableWidth: true,
      // autoplay: true,
      autoplaySpeed: 5000,
      pauseOnFocus: false,
      pauseOnHover: false,
      adaptiveHeight: true,
      dots: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            centerPadding: '60px',
            arrows: true,

          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            centerPadding: '10px',
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            centerPadding: '5px',
          }
        }
      ]
    };

  }

  
  

}
