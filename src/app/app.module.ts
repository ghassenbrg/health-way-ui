import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RequestInterceptorInterceptor } from '@core/interceptors/request-interceptor.interceptor';
import { LoaderService } from '@services/loader.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { DoctorModule } from './doctor/doctor.module';
import { MainComponent } from './main/main.component';
import { PatientModule } from './patient/patient.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    SharedModule,
    CoreModule,
    CommonModule,
    ToastModule,
    PatientModule,
    PharmacyModule,
    DoctorModule,
  ],
  providers: [
    MessageService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
