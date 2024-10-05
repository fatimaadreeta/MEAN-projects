import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AnalyticReportComponent } from './analytic-report/analytic-report.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin-dash', component: AdminDashComponent },
  { path: 'analytic-report', component: AnalyticReportComponent},
  { path: 'products/add-product', component: AddProductComponent},
  { path: 'products/edit-product/:id', component: EditProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }