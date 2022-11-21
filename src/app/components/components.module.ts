import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalkToAstrologerComponent } from './talk-to-astrologer/talk-to-astrologer.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ChatWithAstrologerComponent } from './chat-with-astrologer/chat-with-astrologer.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AstrologyComponent } from './astrology/astrology.component';
import { PremiumreportComponent } from './premiumreport/premiumreport.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FaqpagePageComponent } from './faqpage-page/faqpage-page.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SingleBlogPageComponent } from './single-blog-page/single-blog-page.component';
import { SideBarSectionComponent } from './side-bar-section/side-bar-section.component';
import { KundaliPageComponent } from './kundali-page/kundali-page.component';
import { MatchMakingPageComponent } from './match-making-page/match-making-page.component';
import { PanchangPageComponent } from './panchang-page/panchang-page.component';
import { HoroscopePageComponent } from './horoscope-page/horoscope-page.component';
import { NumerologyPageComponent } from './numerology-page/numerology-page.component';
import { FreeAstrologyComponent } from './free-astrology/free-astrology.component';
import { TabsOnlineAstrologersComponent } from './tabs-online-astrologers/tabs-online-astrologers.component';
import { ArticlesBlogComponent } from './articles-blog/articles-blog.component';
import { FindCityAstrologersComponent } from './find-city-astrologers/find-city-astrologers.component';
import { AstrologersProfilePageComponent } from './astrologers-profile-page/astrologers-profile-page.component';
import { FollowUserPageComponent } from './follow-user-page/follow-user-page.component';
import { AstrologersCardComponent } from './astrologers-card/astrologers-card.component';
import { WalletPageComponent } from './wallet-page/wallet-page.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// import { NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { ChatScreenComponent } from '../shared/chat-screen/chat-screen.component';
import { ProfileInfoUpdateComponent } from './profile-info-update/profile-info-update.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'talk-to-astrologers/',
    component: TalkToAstrologerComponent,
  },
  {
    path: 'chat-with-astrologer/',
    component: ChatWithAstrologerComponent,
  },
  {
    path: 'blog/',
    component: BlogComponent,
  },
  {
    path: 'loginpage',
    component: LoginComponent,
  },
  {
    path: 'vedic-astrology/',
    component: AstrologyComponent,   
  },
  {
    path: 'premium-report/',
    component: PremiumreportComponent,
  },
  {
    path: 'blogpage/bloginnerpage',
    component: SingleBlogPageComponent,
  },
  {
    path: 'kundalipage',
    component: KundaliPageComponent,
  },
  {
    path: 'matchmakingpage',
    component: MatchMakingPageComponent,
  },
  {
    path: 'panchangpage',
    component: PanchangPageComponent,
  },
  {
    path: 'numerologypage',
    component: NumerologyPageComponent,
  },
  {
    path: 'horoscopepage',
    component: HoroscopePageComponent,
  },
  // {
  //   path: 'profileastrologer',
  //   component: AstrologersProfilePageComponent,
  // },

  {
      path: 'astrologer/:id',
      component: AstrologersProfilePageComponent,
  },

  {
    path: 'followinguserdetails',
    component: FollowUserPageComponent,
  },
  {
    path: 'wallet/',
    component: WalletPageComponent,
  },
  {
    path: 'chatscreen/:id',
    component: ChatScreenComponent,
  },
  {
    path: 'profileupdate',
    component: ProfileInfoUpdateComponent,
  },
  {
    path: 'vedic-astrology/business-astrology/',
    component: AstrologyComponent,
  },
  {
    path: 'vedic-astrology/career-&-education/',
    component: AstrologyComponent,
  },
  {
    path: 'vedic-astrology/marriage-prediction/',
    component: AstrologyComponent,
  },
  {
    path: 'vedic-astrology/relationship-&-compatibility/',
    component: AstrologyComponent,
  },
  {
    path: 'vedic-astrology/wealth-&-property/',
    component: AstrologyComponent,
  },
  {
    path: 'vedic-astrology/family-consultation/',
    component: AstrologyComponent,
  },
  {
    path: 'vedic-astrology/medical-astrology/',
    component: AstrologyComponent,
  },
  {
    path: 'vedic-astrology/numerology/',
    component: AstrologyComponent,
  },
  {
    path: 'vedic-astrology/vastu-shastra/',
    component: AstrologyComponent,
  },
  {
    path: 'vedic-astrology/tarot-cards/',
    component: AstrologyComponent,
  }




];

@NgModule({
  declarations: [
    TalkToAstrologerComponent,
    ChatWithAstrologerComponent,
    BlogComponent,
    HomeComponent,
    LoginComponent,
    AstrologyComponent,
    PremiumreportComponent,
    FaqpagePageComponent,
    SingleBlogPageComponent,
    SideBarSectionComponent,
    KundaliPageComponent,
    MatchMakingPageComponent,
    PanchangPageComponent,
    HoroscopePageComponent,
    NumerologyPageComponent,
    FreeAstrologyComponent,
    TabsOnlineAstrologersComponent,
    ArticlesBlogComponent,
    FindCityAstrologersComponent,
    AstrologersProfilePageComponent,
    FollowUserPageComponent,
    AstrologersCardComponent,
    WalletPageComponent,
    ProfileInfoUpdateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    InfiniteScrollModule
  ]
})
export class ComponentsModule { }
