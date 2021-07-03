import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PharmacyDetailsComponent } from './pharmacy-details/pharmacy-details.component';
import { PharmacySearchComponent } from './pharmacy-search/pharmacy-search.component';
import { ProductAllComponent } from './product-all/product-all.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { CartComponent } from './cart/cart.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';



@NgModule({
  declarations: [
    PharmacyComponent,
    PharmacyDetailsComponent,
    PharmacySearchComponent,
    ProductAllComponent,
    ProductDescriptionComponent,
    CartComponent,
    ProductCheckoutComponent,
    PaymentSuccessComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PharmacyModule { }
