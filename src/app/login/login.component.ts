import { Component } from '@angular/core';
import { FormBuilder, PatternValidator, Validators} from '@angular/forms';
import {AccountServiceService} from '../services/account-service.service'
import { Router } from '@angular/router';
import { Toast } from 'primeng/toast';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  get email(){
    return this.loginForm.controls["email"];
  }
  get password(){
    return this.loginForm.controls["password"];
  }

  constructor(
    private fb: FormBuilder, 
    private account: AccountServiceService, 
    private router: Router
    ){}
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
  

  checkUser(value:any){
    this.account.postLoginData(value).subscribe(
      res => {
        try {
          localStorage.setItem("token", res.token);
          if(localStorage.getItem("token")=="undefined"){
            localStorage.clear();
            alert("user not exist");
            return;
          }
          this.account.loger.next(true);
          this.router.navigate(['showData']);
        } catch (error) {
          console.error("Error parsing JSON response:", error);
        }
      },
      error => {
        console.error("Error during login:", error);
      }
    );
    console.log(value);

  }

  goSignup(){
    this.router.navigate(['signup'])
  }

}
