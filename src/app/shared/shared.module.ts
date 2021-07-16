import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '@app/app-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { IfAuthorizedDirective } from './if-authorized.directive';
import { LoaderComponent } from './loader/loader.component';
import {CarouselModule} from 'primeng/carousel';
import {CalendarModule} from 'primeng/calendar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {RadioButtonModule} from 'primeng/radiobutton';
@NgModule({
  declarations: [
    IfAuthorizedDirective,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DropdownModule,
    CarouselModule,
    CalendarModule,
    AutoCompleteModule,
    RadioButtonModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IfAuthorizedDirective,
    DropdownModule,
    LoaderComponent,
    CarouselModule,
    CalendarModule,
    RadioButtonModule
  ]
})
export class SharedModule { }
