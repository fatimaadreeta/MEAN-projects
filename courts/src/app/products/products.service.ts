import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';


@Injectable({providedIn: 'root'})

export class ProductsService {

    constructor(private http: HttpClient, private fb: FormBuilder) { }

    productForm = this.fb.group({
      _id: [null],
      name:['', Validators.required],
      imageUrl:['', Validators.required],
      description: ['', Validators.required],
      price:['', Validators.required],
    })

    //add 
     addProduct(product: any){
      return this.http.post('http://localhost:3000/api/product', product);
      }

      //fetch all
      getProducts(){
        return this.http.get('http://localhost:3000/api/product');
      }

      //delete
      deleteProduct(id: any){
        return this.http.delete('http://localhost:3000/api/product/'+id);
      }

      //get single product
      singleProduct(id: string){
        return this.http.get('http://localhost:3000/api/product/'+id);
      }

      //update
      updateProduct(product: object, id: string){
        return this.http.put('http://localhost:3000/api/product/'+id, product);
      }

    }
