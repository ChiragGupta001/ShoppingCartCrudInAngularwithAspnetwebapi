import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder , Validators} from '@angular/forms';
import { error } from 'jquery';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent {
  public item: any;
  public updatedData:any;
  public check:boolean = false;

  get ItemName(){
    return this.updatedData.controls['Name'];
  }
  get itemImage(){
    return this.updatedData.controls['Image'];
  }
  get itemDesc(){
    return this.updatedData.controls['Description'];
  }
  get itemCategory(){
    return this.updatedData.controls['Category'];
  }
  get itemQuantity(){
    return this.updatedData.controls['Quantity'];
  }
  get itemPrice(){
    return this.updatedData.controls['Price'];
  }

  constructor(
    private router: ActivatedRoute,
    private navRouter: Router, 
    private user: UserServiceService, 
    private fb: FormBuilder,
    private messageService: MessageService){}
    
  ngOnInit(){
    let id = this.router.snapshot.paramMap.get('id');
    this.user.getById(id).subscribe(res=>{
      this.item = res;
      this.updatedData = this.fb.group({
        Id:[this.item.id],
        Name: [this.item.name, [Validators.required]],
        Image: [this.item.image, [Validators.required]],
        Description: [this.item.description, [Validators.required]],
        Category: [this.item.category, [Validators.required]],
        Quantity: [this.item.quantity, [Validators.required]],
        Price:[this.item.price, [Validators.required]]
      })
      console.log(res);
    });
  }

  EditItem(value: any){
    this.user.updateItem(value)
    .subscribe(
        () => {
          this.navRouter.navigate(['showData']);
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Update Succesfully'});
          }, 300);
        },
        (error) => {
          this.navRouter.navigate(['**']);
        }
      );  
  }

  goBack(){
    this.navRouter.navigate(['showData']);
  }
}
