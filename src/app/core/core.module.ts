import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { Home1Component } from './components/home1/home-1.component';
import { Home2Component } from './components/home2/home-2.component';
import { Home3Component } from './components/home3/home-3.component';
import { HomeSliderComponent } from './components/home-slider/home-slider.component';
import { throwIfAlreadyLoaded } from './guards/module-import.guard';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    Home1Component,
    Home2Component,
    Home3Component,
    HomeSliderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    Home1Component,
    Home2Component,
    Home3Component,
    HomeSliderComponent,
    NotFoundComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

}
