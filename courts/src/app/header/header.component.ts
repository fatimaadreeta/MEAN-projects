import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{

  private authenticationSub: Subscription;
  userAuthenticated = false;
  constructor(private router:Router, private authService: AuthService){}

  logout(){
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.authenticationSub.unsubscribe();
  }
  
  ngOnInit(): void {
    this.authenticationSub = this.authService.getAuthenticatedListener().subscribe(status => {
      this.userAuthenticated = status;
    })
  }

}
