import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from './products.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../authentication/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: any;
  userAuthenticated = true;

  constructor(private router: Router, private productService: ProductsService, private http: HttpClientModule, private authService: AuthService) { }

  ngOnInit() {
    this.getProducts();                                              
  }

  notApplicable(){
    alert("not applicable for admins");
  }

  getProducts(){
    return this.productService.getProducts().subscribe((data: any) => {
      console.log(data);
      this.products = data;
    })
  }

  logout(){
    this.userAuthenticated = false;
    this.authService.logOut();
  }
}