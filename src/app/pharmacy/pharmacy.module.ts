import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PharmacyDetailsComponent } from './pharmacy-details/pharmacy-details.component';
import { PharmacySearchComponent } from './pharmacy-search/pharmacy-search.component';
import { ProductAllComponent } from './product-all/product-all.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { CartComponent } from './cart/cart.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '@shared/shared.module';
import { PcrTestComponent } from './pcr-test/pcr-test.component';
import { VaccinationComponent } from './vaccination/vaccination.component';



@NgModule({
  declarations: [
    PharmacyComponent,
    PharmacyDetailsComponent,
    PharmacySearchComponent,
    ProductAllComponent,
    ProductDescriptionComponent,
    CartComponent,
    ProductCheckoutComponent,
    PaymentSuccessComponent,
    PcrTestComponent,
    VaccinationComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ],

})
export class PharmacyModule { }
