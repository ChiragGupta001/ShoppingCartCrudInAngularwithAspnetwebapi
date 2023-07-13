import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  private jwtHelper: JwtHelperService;
  loger = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) { 
    this.jwtHelper = new JwtHelperService();
  }

  public decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  public getClaim(token: any, claimKey: string): any {
    const decodedTokens = this.decodeToken(token);
    console.log(decodedTokens.role)
    return decodedTokens.role;
  }
  
  postLoginData(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(data);
    return this._http.post("https://localhost:7038/api/Account/Login", body,{'headers':headers});
  }


  getToken(){
    return localStorage.getItem("token");
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem("token");
  }

  createUser(data: any){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(data);
    return this._http.post<any>("https://localhost:7038/api/Account", body, {'headers':headers});
  }

  logOut(){
    localStorage.clear();
    return;
  }
}
