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
import { AstrologerCallPopupComponent } from './astrologer-call-popup/astrologer-call-popup.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SliderClientsComponent,
    SingUpPopupComponent,
    ProcessPayPopupComponent,
    AstrologerCallPopupComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatTabsModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SliderClientsComponent,
    SingUpPopupComponent,
    ProcessPayPopupComponent
  ]
})

export class SharedModule { }
