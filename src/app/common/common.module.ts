import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { ComponentsComponent } from './components/components.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { VoiceCallComponent } from './voice-call/voice-call.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    VoiceCallComponent,
    VideoCallComponent,
    CalendarComponent,
    ComponentsComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule
  ]
})
export class CommonModule { }
