import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products/products.service';
import { Products } from '../products.model';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})

export class EditProductComponent implements OnInit{

  productId: string;
  product: any;
  isLoadinig: boolean = false;
  loadingTitle: string = '';
  errors: any = [];
 
  constructor(
    public productService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private url: ActivatedRoute
  ) {
    
  }

  ngOnInit(){
    this.productId = this.url.snapshot.paramMap.get('id');
   //alert(this.productId);
   this.productService.singleProduct(this.productId).subscribe((res:any) => {
    console.log(res);
    if (res) { // Ensure that the response is not null or undefined
      this.product = {
        _id: res._id,
        name: res.name,
        imageUrl: res.imageUrl,
        description: res.description,
        price: res.price
      };
    }
   })
  }

  updateProduct(){
    var inputData = {
      name: this.product.name,
      imageUrl: this.product.imageUrl,
      description: this.product.description,
      price: this.product.price
    }

    this.productService.updateProduct(inputData, this.productId).subscribe({
      next: (res:any) => {
        console.log(res);
        alert("updated successfully");
        this.router.navigate(['/admin-dash']);
      },
      error: (err:any) => {
        this.errors = err;
      }
    });
  }
}