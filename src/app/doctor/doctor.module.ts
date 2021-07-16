import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { CoreModule } from '../core/core.module';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ChatDoctorComponent } from './chat-doctor/chat-doctor.component';
import { DoctorAddBlogComponent } from './doctor-add-blog/doctor-add-blog.component';
import { DoctorBlogComponent } from './doctor-blog/doctor-blog.component';
import { DoctorChangePasswordComponent } from './doctor-change-password/doctor-change-password.component';
import { DoctorDashboardContainerComponent } from './doctor-dashboard-container/doctor-dashboard-container.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { DoctorProfileSettingsComponent } from './doctor-profile-settings/doctor-profile-settings.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { MyPatientsComponent } from './my-patients/my-patients.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ScheduleTimingsComponent } from './schedule-timings/schedule-timings.component';
import { SocialMediaComponent } from './social-media/social-media.component';

@NgModule({
  declarations: [
    DoctorDashboardComponent,
    AppointmentsComponent,
    ScheduleTimingsComponent,
    MyPatientsComponent,
    PatientProfileComponent,
    ChatDoctorComponent,
    InvoicesComponent,
    DoctorProfileSettingsComponent,
    ReviewsComponent,
    DoctorRegisterComponent,
    DoctorBlogComponent,
    DoctorAddBlogComponent,
    SocialMediaComponent,
    DoctorChangePasswordComponent,
    DoctorDashboardContainerComponent,
  ],
  imports: [BrowserModule, SharedModule, CoreModule, TooltipModule],
})
export class DoctorModule {}
