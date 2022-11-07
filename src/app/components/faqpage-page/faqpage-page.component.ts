import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqpage-page',
  templateUrl: './faqpage-page.component.html',
  styleUrls: ['./faqpage-page.component.scss']
})
export class FaqpagePageComponent implements OnInit {

  public show:boolean = false;
  public buttonName:any = 'Show';

  constructor() { }

  ngOnInit(): void {
  }
 
  toggle() {
    this.show = !this.show;
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }


}
