import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';
import { BlogGridComponent } from './blog/blog-grid/blog-grid.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { CalendarComponent } from './common/calendar/calendar.component';
import { ChatComponent } from './common/chat/chat.component';
import { ComponentsComponent } from './common/components/components.component';
import { ForgotPasswordComponent } from './common/forgot-password/forgot-password.component';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { VideoCallComponent } from './common/video-call/video-call.component';
import { VoiceCallComponent } from './common/voice-call/voice-call.component';
import { AuthGuard } from './core/auth/_helper/auth.guard';
import { HomeComponent } from './core/components/home/home.component';
import { Home1Component } from './core/components/home1/home-1.component';
import { Home2Component } from './core/components/home2/home-2.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { AppointmentsComponent } from './doctor/appointments/appointments.component';
import { ChatDoctorComponent } from './doctor/chat-doctor/chat-doctor.component';
import { DoctorAddBlogComponent } from './doctor/doctor-add-blog/doctor-add-blog.component';
import { DoctorBlogComponent } from './doctor/doctor-blog/doctor-blog.component';
import { DoctorChangePasswordComponent } from './doctor/doctor-change-password/doctor-change-password.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorProfileSettingsComponent } from './doctor/doctor-profile-settings/doctor-profile-settings.component';
import { DoctorRegisterComponent } from './doctor/doctor-register/doctor-register.component';
import { InvoicesComponent } from './doctor/invoices/invoices.component';
import { MyPatientsComponent } from './doctor/my-patients/my-patients.component';
import { PatientsListComponent } from './patient/patients-list/patients-list.component';
import { ReviewsComponent } from './doctor/reviews/reviews.component';
import { ScheduleTimingsComponent } from './doctor/schedule-timings/schedule-timings.component';
import { SocialMediaComponent } from './doctor/social-media/social-media.component';
import { MainComponent } from './main/main.component';
import { BookingSuccessComponent } from './patient/booking-success/booking-success.component';
import { BookingComponent } from './patient/booking/booking.component';
import { ChangePasswordComponent } from './patient/change-password/change-password.component';
import { CheckoutComponent } from './patient/checkout/checkout.component';
import { DoctorProfileComponent } from './patient/doctor-profile/doctor-profile.component';
import { FavouritesComponent } from './patient/favourites/favourites.component';
import { InvoiceViewComponent } from './patient/invoice-view/invoice-view.component';
import { MapSearcherComponent } from './patient/map-searcher/map-searcher.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { ProfileSettingsComponent } from './patient/profile-settings/profile-settings.component';
import { SearchComponent } from './patient/search/search.component';
import { CartComponent } from './pharmacy/cart/cart.component';
import { PaymentSuccessComponent } from './pharmacy/payment-success/payment-success.component';
import { PharmacyDetailsComponent } from './pharmacy/pharmacy-details/pharmacy-details.component';
import { PharmacySearchComponent } from './pharmacy/pharmacy-search/pharmacy-search.component';
import { PharmacyComponent } from './pharmacy/pharmacy/pharmacy.component';
import { ProductAllComponent } from './pharmacy/product-all/product-all.component';
import { ProductCheckoutComponent } from './pharmacy/product-checkout/product-checkout.component';
import { ProductDescriptionComponent } from './pharmacy/product-description/product-description.component';

const routes: Routes = [
  // Home
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'home1', component: Home1Component },
      { path: 'home2', component: Home2Component },

      // Doctor
      { path: 'doctor-dashboard', component: DoctorDashboardComponent, canActivate: [AuthGuard] },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'schedule-timings', component: ScheduleTimingsComponent },
      { path: 'my-patients', component: MyPatientsComponent },
      { path: 'patient-profile', component: AppointmentsComponent },
      { path: 'chat-doctor', component: ChatDoctorComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'doctor-profile-settings', component: DoctorProfileSettingsComponent, canActivate: [AuthGuard] },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'social-media', component: SocialMediaComponent },
      { path: 'doctor-change-password', component: DoctorChangePasswordComponent },
      { path: 'doctor-register', component: DoctorRegisterComponent },
      { path: 'doctor-blog', component: DoctorBlogComponent },
      { path: 'doctor-add-blog', component: DoctorAddBlogComponent },

      // Patient
      { path: 'map-grid', component: MapSearcherComponent },
      { path: 'search', component: SearchComponent },
      { path: 'doctor-profile', component: DoctorProfileComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'booking-success', component: BookingSuccessComponent },
      { path: 'patient-dashboard', component: PatientDashboardComponent },
      { path: 'favourites', component: FavouritesComponent },
      { path: 'profile-settings', component: ProfileSettingsComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'invoice-view', component: InvoiceViewComponent },
      { path: 'patients-list', component: PatientsListComponent },

      // Pharmacy
      { path: 'pharmacy', component: PharmacyComponent },
      { path: 'pharmacy-details', component: PharmacyDetailsComponent },
      { path: 'pharmacy-search', component: PharmacySearchComponent },
      { path: 'product-all', component: ProductAllComponent },
      { path: 'product-description', component: ProductDescriptionComponent },
      { path: 'cart', component: CartComponent },
      { path: 'product-checkout', component: ProductCheckoutComponent },
      { path: 'payment-success', component: PaymentSuccessComponent },

      // Blog
      { path: 'blog-list', component: BlogListComponent },
      { path: 'blog-grid', component: BlogGridComponent },
      { path: 'blog-details', component: BlogDetailsComponent },

      // Common
      { path: 'chat', component: ChatComponent },
      { path: 'voice-call', component: VoiceCallComponent },
      { path: 'video-call', component: VideoCallComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'components', component: ComponentsComponent },

      //auth
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },

      // 404 Not Found
      { path: '**', component: NotFoundComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
