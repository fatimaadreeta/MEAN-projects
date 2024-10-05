import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Products } from '../../products/products.model';
import { ProductsService } from '../../products/products.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  addProduct: any;
 
  constructor(public productService: ProductsService, private fb:FormBuilder, private router: Router) {
    this.addProduct = fb.group({
      name:['', Validators.required],
      imageUrl:['', Validators.required],
      description: ['', Validators.required],
      price:['', Validators.required],
    })
   }


      ngOnInit(): void{

      }

      onSubmit(){
        console.log(this.addProduct.value);
        this.productService.addProduct(this.addProduct.value).subscribe((productData) => {
          console.log(productData);
          this.router.navigate(['/admin-dash'])
        })
      }
}