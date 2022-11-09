import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  slides = [
    {img: "https://uploads-ssl.webflow.com/60f8225c1867f5804f11d289/61461e9a9dc0fff2da76d22e_weblarge_Libra.jpg" , title: "one tow", subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,et dolore magna aliqua."},
    {img: "https://uploads-ssl.webflow.com/60f8225c1867f5804f11d289/61461e7c3543ef5da0fc0824_weblarge_Gem.jpg", title: "for is slide4", subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,et dolore magna aliqua."},
    {img: "https://uploads-ssl.webflow.com/60f8225c1867f5804f11d289/61461e91c0904598d0980190_weblarge_Leo.jpg", title: "one is slider2", subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,et dolore magna aliqua."},
    {img: "https://uploads-ssl.webflow.com/60f8225c1867f5804f11d289/61461e7c3543ef5da0fc0824_weblarge_Gem.jpg" , title: "this is slider", subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,et dolore magna aliqua."},
    {img: "https://uploads-ssl.webflow.com/60f8225c1867f5804f11d289/61461ea175c7457dcb41d746_weblarge_Scorp.jpg" , title: "three is slider", subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,et dolore magna aliqua."},
    {img: "https://uploads-ssl.webflow.com/60f8225c1867f5804f11d289/61461e7c3543ef5da0fc0824_weblarge_Gem.jpg" , title: "four is slider", subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,et dolore magna aliqua."},
    {img: "https://uploads-ssl.webflow.com/60f8225c1867f5804f11d289/61461e9a9dc0fff2da76d22e_weblarge_Libra.jpg" , title: "five is slider", subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,et dolore magna aliqua."},
    {img: "https://uploads-ssl.webflow.com/60f8225c1867f5804f11d289/61461e7c3543ef5da0fc0824_weblarge_Gem.jpg" , title: "two is slider", subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,et dolore magna aliqua."}
  ];
  
  slideConfig : any = null;

  constructor() { }

  ngOnInit(): void {

    this.slideConfig = {
      infinite: true,
      slidesToScroll: 1,
      slidesToShow: 5,
      speed: 3000,
      draggable: true,
      centerMode: true,
      variableWidth: true,
      autoplay: true,
      autoplaySpeed: 3000,
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
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: false,
            centerPadding: '5px',
          }
        }
      ]
    };

  }

  
  

}
