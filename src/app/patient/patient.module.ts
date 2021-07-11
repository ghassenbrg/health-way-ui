import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BookingSuccessComponent } from './booking-success/booking-success.component';
import { BookingComponent } from './booking/booking.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorSearcherGridComponent } from './doctor-searcher-grid/doctor-searcher-grid.component';
import { DoctorSearcherListComponent } from './doctor-searcher-list/doctor-searcher-list.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { MapSearcherComponent } from './map-searcher/map-searcher.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { SearchComponent } from './search/search.component';
import { PatientSummaryComponent } from './patient-summary/patient-summary.component';



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
    DoctorSearcherListComponent,
    PatientsListComponent,
    PatientSummaryComponent  
  ],
  imports: [
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDpxI-NDCHBmyyAARt-5e5m_zfhmIBUsPw'
    })
  ]
})
export class PatientModule { }
