import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GoogleMapsModule } from '@angular/google-maps';
import {MatIconModule} from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';


import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component'
import { ProfileComponent } from './profile/profile.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AnalyticReportComponent } from './analytic-report/analytic-report.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor } from './authentication/auth-interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    HeaderComponent,
    ProfileComponent,
    AdminDashComponent,
    AnalyticReportComponent,
    AddProductComponent,
    EditProductComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule, 
    BrowserAnimationsModule,
    MatCardModule, 
    MatGridListModule,
    MatMenuModule,
    MatDatepickerModule,
    MatIconModule,
    GoogleMapsModule,
    MatSidenav,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
