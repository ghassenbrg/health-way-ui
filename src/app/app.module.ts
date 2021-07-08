import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RequestInterceptorInterceptor } from '@core/interceptors/request-interceptor.interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { PatientModule } from './patient/patient.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    CommonModule,
    ToastModule,
    PatientModule
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
