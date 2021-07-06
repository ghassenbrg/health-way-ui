import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { HomeSliderComponent } from './components/home-slider/home-slider.component';
import { HomeComponent } from './components/home/home.component';
import { Home1Component } from './components/home1/home-1.component';
import { Home2Component } from './components/home2/home-2.component';
import { Home3Component } from './components/home3/home-3.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
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
    SharedModule
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
