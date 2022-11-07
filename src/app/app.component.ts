import { Component } from '@angular/core';
import { NavigationStart, Router, ActivatedRoute  } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'onegodmed-apps';
  router: any;
  urlflag: boolean = true;

   constructor(private _router: Router, private activatedRoute: ActivatedRoute) {
    this.router = window.location;
    var url = this.router.pathname.split('/');
    if(url.includes('chatscreen')){
      this.urlflag = false;
    }else{
      this.urlflag = true;
    }
   }

  ngOnInit() {
  //   this.router.events.subscribe(event =>{
  //     if (event instanceof NavigationStart){
       
  //     }
  //  })

  }

  // /**
  //  * Check if the router url contains the specified route
  //  *
  //  * @param {string} route
  //  * @returns
  //  * @memberof MyComponent
  //  */
  // hasRoute(route: string) {
  //   return this.router.url.includes(route);
  // }
  



}
