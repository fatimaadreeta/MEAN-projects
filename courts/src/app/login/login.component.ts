import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy{

  private authenticationSub: Subscription;
  userAuthenticated = false;
  loginForm : FormGroup;

  constructor(private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "username": new FormControl('', [Validators.required]),
      "password": new FormControl('', [Validators.required]),
    });
    this.authenticationSub = this.authService.getAuthenticatedListener().subscribe(status => {
      this.userAuthenticated = status;
    })
  }

  ngOnDestroy(): void {
    this.authenticationSub.unsubscribe();
  }

  hide = true; //hiding passwords

  admin(){
    this.authService.loginAdmin(this.loginForm.value.username, this.loginForm.value.password);
  }


  signup(){
    this.router.navigate(['/sign-up']);
  }
  alert(){
    alert("Cannot change password right now");
  }

  dashboard(){
    this.router.navigate(['/admin-dash']);
  }
}
