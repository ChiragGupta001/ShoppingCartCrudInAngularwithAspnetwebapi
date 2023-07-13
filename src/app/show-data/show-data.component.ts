import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { AccountServiceService } from '../services/account-service.service';
import { SortEvent } from 'primeng/api';



@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent {
  title = 'datatables';
  public role: any;
  dtOptions: DataTables.Settings = {};
  public items: any;
  constructor(
    private user: UserServiceService,
    private router: Router,
    private account: AccountServiceService
  ) {

  }
  ngOnInit() {
    const token = this.account.getToken();
    this.role = this.account.getClaim(token, 'role');
    console.log(this.role);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.user.getData().subscribe(res => {
      this.items = res;
      console.log(res);
    });
  }

  DetailItem(item: any) {
    this.router.navigate(['detail', item.id])
  }

  EditItem(item: any) {
    this.router.navigate(['edit', item.id])
  }

  DeleteItem(item: any) {
    this.router.navigate(['delete', item.id])
  }

  customSort(event: SortEvent) {
    const field = event.field; // Get the field being sorted
    const order = event.order ?? 1; // Get the sort order (1 for ascending, -1 for descending)

    if (field) {
      this.items.sort((item1: any, item2: any) => {
        const value1 = item1[field];
        const value2 = item2[field];

        if (value1 == null && value2 != null) return -1;
        if (value1 != null && value2 == null) return 1;
        if (value1 == null && value2 == null) return 0;

        if (typeof value1 === 'string' && typeof value2 === 'string') {
          return order * value1.localeCompare(value2);
        }

        return order * (value1 < value2 ? -1 : value1 > value2 ? 1 : 0);
      });
    }
  }
}
