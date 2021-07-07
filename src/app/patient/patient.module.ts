import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { DoctorSearcherGridComponent } from './doctor-searcher-grid/doctor-searcher-grid.component';
import { DoctorSearcherListComponent } from './doctor-searcher-list/doctor-searcher-list.component';
import { MapSearcherComponent } from './map-grid/map-searcher.component';



@NgModule({
  declarations: [
    MapSearcherComponent,
    SearchComponent,
    DoctorProfileComponent,
    BookingComponent,
    CheckoutComponent,
    BookingSuccessComponent,
    PatientDashboardComponent,
    FavouritesComponent,
    ProfileSettingsComponent,
    ChangePasswordComponent,
    InvoiceViewComponent,
    DoctorSearcherGridComponent,
    DoctorSearcherListComponent
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
