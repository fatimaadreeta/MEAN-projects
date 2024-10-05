import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthModel } from "./auth-model";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";


@Injectable({providedIn:"root"})
export class AuthService{

    private token: string;
    private authenticatedSub = new Subject<boolean>();
    constructor(private http: HttpClient, private router: Router){}

    getAuthenticatedListener(){
        return this.authenticatedSub.asObservable();
    }

    getToken(){
        return this.token;
    }

    signupAdmin(username: string, password: string){

        const authData: AuthModel = {username: username, password: password};
        
        this.http.post('http://localhost:3000/api/sign-up/', authData).subscribe(res => {
            console.log(res);
        })
    }

    loginAdmin(username: string, password: string){
        const authData: AuthModel = {username: username, password: password};

        this.http.post<{token: string}>('http://localhost:3000/api/login/', authData).subscribe(res=>{
            console.log(res);
            this.token = res.token;
            if(this.token){
                this.authenticatedSub.next(true);
            }
        })
            
    }
    logOut(){
        this.token = '';
        this.authenticatedSub.next(false);
        this.router.navigate(['/']);
    }

}