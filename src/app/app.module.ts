import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HomeSliderComponent } from './core/components/home-slider/home-slider.component';
import { HomeComponent } from './core/components/home/home.component';
import { Home1Component } from './core/components/home1/home-1.component';
import { Home2Component } from './core/components/home2/home-2.component';
import { Home3Component } from './core/components/home3/home-3.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
