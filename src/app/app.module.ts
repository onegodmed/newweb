import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from "./services/login.service";
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AstrologerlistService } from "./services/astrologerlist.service";
import { UserService } from './services/user.service';
import { AstrologyService } from './services/astrology.service';
import { BloglistService } from './services/bloglist.service';
import { FollounfollowService } from './services/follounfollow.service';
import { HomeastrologerlistService } from './services/homeastrologerlist.service';
import { LogoutService } from './services/logout.service';
import { PackageService } from './services/package.service';
import { RazorpayService } from './services/razorpay.service';
import { TestimonialService } from './services/testimonial.service';
import { SocketIoModule, SocketIoConfig  } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const config: SocketIoConfig = {
	url: environment.socketUrl, // socket server url;
	options: {
		transports: ['websocket']
	}
}



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    InfiniteScrollModule
  ],
  providers: [
    LoginService,
    UserService,
    AstrologerlistService,
    AstrologyService,
    BloglistService,
    FollounfollowService,
    HomeastrologerlistService,
    LogoutService,
    PackageService,
    RazorpayService,
    TestimonialService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
