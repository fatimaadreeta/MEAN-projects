import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }

  hide = true; //hiding passwords

  login(){
    this.router.navigate(['/login']);
  }

  onSubmit(){
    this.authService.signupAdmin(this.signupForm.value.username, this.signupForm.value.password);
    
  }
}