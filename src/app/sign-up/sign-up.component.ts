import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators} from '@angular/forms';
import { PasswordValidator} from '../shared/password.validator';
import { AccountServiceService} from '../services/account-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  get userName(){
    return this.SignupForm.controls["UserName"];
  }
  get email(){
    return this.SignupForm.controls["Email"];
  }
  get password(){
    return this.SignupForm.controls["Password"];
  }
  get phoneNo(){
    return this.SignupForm.controls["PhoneNumber"];
  }
  
  constructor(private fb: FormBuilder, private account: AccountServiceService, private router: Router){}

  SignupForm = this.fb.group({
    UserName: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{4,}$")]],
    ConfirmPassword: [''],
    PhoneNumber: ['', [Validators.required]]
  }, {validator: PasswordValidator})

  gologin(){
    this.router.navigate(['login'])
  }

  signUp(value: any)
  {
    this.account.createUser(value).subscribe(res =>
    {
      try {
        this.router.navigate(['login'])
        alert("User Successfully created")
      } catch (error) {
        console.error("Error:", error);
      }
    },
    error => {
      if(error.status === 409){
        alert("User Already exist")
        return;
      }
      alert("something went wrong");
      return;
    })

  }

}
