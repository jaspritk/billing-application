import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';


@Component({
  selector: 'app-find-customer',
  templateUrl: './find-customer.component.html',
  styleUrls: ['./find-customer.component.css']
})
export class FindCustomerComponent implements OnInit {
  customers: any = []
  copycustomers: any = []
  customerId: any;
  items: any = [];
  copyitems: any = []
  p: number = 1;
  dates: any = []
  uniqueDates: any = [];

  showDialog = false;
  searchText!: any;
  date = moment();
  searchDate: any;
  // groupBy: any;
  groupedByDate: any;


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCustomer()
  }

  getCustomer() {
    this.apiService.GetCustomer().subscribe((response: any) => {
      this.customers = response;
      this.copycustomers = response;
      this.customers.sort((a: any, b: any) => {
        return <any>new Date(b.date) - <any>new Date(a.date);
      });

    })
  }

  // groupBy(list: any, keyGetter: any) {
  //   const map = new Map();
  //   list.forEach((item: any) => {
  //     const key = keyGetter(item);
  //     const collection = map.get(key);
  //     if (!collection) {
  //       map.set(key, [item]);
  //     } else {
  //       collection.push(item);
  //     }
  //   });
  //   return map;
  // }

  getBill(customer: any) {
    this.apiService.GetBill(customer._id).subscribe((response: any) => {
      this.items = response;
      this.copyitems = response;
      this.uniqueDates = [...new Set(this.items.map((item: any) => item.date))];
    })
  }

  onSearchByText() {
    this.apiService.SearchForCustomer(this.searchText).subscribe((response: any) => {
      this.customers = response;
    })
  }

  // onSearchByDate() {
  //   // moment(this.searchDate).format('LL')
  //   // console.log("moment(this.searchDate).format('LL')", moment(this.searchDate).format('LL'))

  //   this.customers = this.copyitems.filter((t: any) => {
  //     // if (this.selectedCategory == "") {

  //     //   return this.menus
  //     console.log("t.date", t.date);
  //     // }
  //     return t.date == moment(this.searchDate).format('LL');
  //   })
  // }



}

