import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapGridComponent } from './map-grid/map-grid.component';
import { MapListComponent } from './map-list/map-list.component';
import { SearchComponent } from './search/search.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { BookingComponent } from './booking/booking.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BookingSuccessComponent } from './booking-success/booking-success.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { CoreModule } from '../core/core.module';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    MapGridComponent,
    MapListComponent,
    SearchComponent,
    DoctorProfileComponent,
    BookingComponent,
    CheckoutComponent,
    BookingSuccessComponent,
    PatientDashboardComponent,
    FavouritesComponent,
    ProfileSettingsComponent,
    ChangePasswordComponent,
    InvoiceViewComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDpxI-NDCHBmyyAARt-5e5m_zfhmIBUsPw'
    })
  ]
})
export class PatientModule { }
