import { Component } from '@angular/core';
import { AccountServiceService } from './services/account-service.service';
import { Router } from '@angular/router';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public logged: any;
  public log: any;
  loger!: boolean;
  constructor(
    private account: AccountServiceService, 
    private router: Router,
    private userservice: UserServiceService) {
  }

  ngOnInit() {
    this.account.loger.subscribe( res=>{
      this.loger = res });
    this.logged = this.account.isLoggedIn();
    if (this.logged) {
      this.account.loger.next(true);
      this.router.navigate(['showData']);
    } else {
      this.router.navigate(['login'])
    }
  }

  logOut() {
    this.account.logOut();
    this.router.navigate(['login']);
  }
}
