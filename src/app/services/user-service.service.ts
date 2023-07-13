import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AccountServiceService} from './account-service.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private _http: HttpClient,
     private account: AccountServiceService
     ) { }

  getData() {
    var auth_token = localStorage.getItem("token");
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
  
    const requestOptions = { headers: headers };
    return this._http.get("https://localhost:7038/api/Item/GetProduct", { headers: headers });
  }

  addData(data:any): Observable<any>{
    var auth_token = localStorage.getItem("token");
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const body=JSON.stringify(data);
    return this._http.post("https://localhost:7038/api/Item/AddProduct", body, { headers: headers });

  }

  getById(id: any){
    var auth_token = localStorage.getItem("token");
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this._http.get("https://localhost:7038/api/Item/GetById/"+ id, { headers: headers });
  }

  updateItem(data: any){
    var auth_token = localStorage.getItem("token");
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this._http.put<any>('https://localhost:7038/api/Item/UpdateProduct/'+ data.id, data, { headers: headers });        
  }

  deleteItem(id:any){
    var auth_token = localStorage.getItem("token");
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this._http.delete<any>('https://localhost:7038/api/Item/DeleteProduct/'+id, { headers: headers })
  }

  


}
