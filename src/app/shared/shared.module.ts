import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SliderClientsComponent } from './slider-clients/slider-clients.component';
import { SingUpPopupComponent } from './sing-up-popup/sing-up-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ProcessPayPopupComponent } from './process-pay-popup/process-pay-popup.component';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';
import { AstrologerCallPopupComponent } from './astrologer-call-popup/astrologer-call-popup.component';
import { MobileBannerSliderComponent } from './mobile-banner-slider/mobile-banner-slider.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SliderClientsComponent,
    SingUpPopupComponent,
    ProcessPayPopupComponent,
    ChatScreenComponent,
    AstrologerCallPopupComponent,
    MobileBannerSliderComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    MatDialogModule,
    MatMenuModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SliderClientsComponent,
    SingUpPopupComponent,
    ProcessPayPopupComponent,
    ChatScreenComponent,
    AstrologerCallPopupComponent,
    MobileBannerSliderComponent
  ]
})

export class SharedModule { }
