import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { ScheduleTimingsComponent } from './schedule-timings/schedule-timings.component';
import { AppModule } from '../app.module';
import { MyPatientsComponent } from './my-patients/my-patients.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { ChatDoctorComponent } from './chat-doctor/chat-doctor.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { DoctorProfileSettingsComponent } from './doctor-profile-settings/doctor-profile-settings.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { DoctorBlogComponent } from './doctor-blog/doctor-blog.component';
import { DoctorAddBlogComponent } from './doctor-add-blog/doctor-add-blog.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { DoctorChangePasswordComponent } from './doctor-change-password/doctor-change-password.component';
import { CoreModule } from '../core/core.module';

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
    DoctorChangePasswordComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class DoctorModule { }
