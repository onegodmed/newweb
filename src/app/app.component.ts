import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'onegodmed-apps';

   constructor(private router: Router) {}

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
