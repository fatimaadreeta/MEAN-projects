import { Component, OnInit} from '@angular/core';
import { ProductsService } from '../products/products.service';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/authentication.service';


@Component({
  selector: 'admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css'],
})
export class AdminDashComponent implements OnInit {

  products: any;
  userAuthenticated = true;
  constructor(private productsService: ProductsService, private router:Router, private authService: AuthService) {

  
  }

  ngOnInit(){
      this.getProducts();
  }

  getProducts(){
    return this.productsService.getProducts().subscribe((data: any) => {
      console.log(data);
      this.products = data;
    })
  }

  onDelete(product: any){
    return this.productsService.deleteProduct(product._id).subscribe(data => {
      console.log(data);
      this.products = this.products.filter((newProductList: any) => newProductList!==product)
    })
  }

  home(){
    this.router.navigate(["products"]);
  }

  goToAddProduct(){
    this.router.navigate(["products/add-product"]);
  }

  populateForm(id: string): void {
    this.router.navigate(['products/edit-product', id]); // Navigate with ID as parameter
  }

  logout(){
    this.userAuthenticated = false;
    this.authService.logOut();
  }
}
