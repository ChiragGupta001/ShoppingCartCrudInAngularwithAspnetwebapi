import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserServiceService} from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  get ItemName(){
    return this.addNewItem.controls['Name'];
  }
  get itemImage(){
    return this.addNewItem.controls['Image'];
  }
  get itemDesc(){
    return this.addNewItem.controls['Description'];
  }
  get itemCategory(){
    return this.addNewItem.controls['Category'];
  }
  get itemQuantity(){
    return this.addNewItem.controls['Quantity'];
  }
  get itemPrice(){
    return this.addNewItem.controls['Price'];
  }
  constructor(private fb: FormBuilder, private user: UserServiceService, private router: Router){}

  addNewItem = this.fb.group({
    Name: ['', [Validators.required]],
    Image: ['', [Validators.required]],
    Description: ['', [Validators.required]],
    Category: ['', [Validators.required]],
    Quantity: ['', [Validators.required]],
    Price:['', [Validators.required]]
  })

  AddItem(value: any){
    this.user.addData(value).subscribe(
      res => {
        this.router.navigate(['showData'])
      }, 
      error => {
        this.router.navigate(['**'])
        // console.error("Error during login:", error);
      }
    );
    // console.log(value);
  }

  goBack(){
    this.router.navigate(['showData'])
  }
}
