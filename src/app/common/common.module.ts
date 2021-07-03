import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
import { VoiceCallComponent } from './voice-call/voice-call.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ComponentsComponent } from './components/components.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



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
    CommonModule
  ]
})
export class CommonModule { }
