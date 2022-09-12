import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;
  chart: any;
  customers: any = [];
  ids: any = [];
  items = [];
  groupByFoodItems: any;
  groupByDates: any;
  sortedFoodItems: any;
  spliceFoodItems: any;
  topFoodItems: any = [];

  constructor(private apiService: ApiService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getCustomer();
    this.getAllItems();
    this.graph();
  }

  getCustomer() {
    this.apiService.GetCustomer().subscribe((response: any) => {
      this.customers = response;

      this.customers.forEach((element: any) => {
        this.ids?.push(element._id);
      });
    })
  }

  groupBy(list: any, keyGetter: any) {
    const map = new Map();
    const sortedMap = new Map();
    list.forEach((item: any) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
        // var sortedMap = new Map([...map].sort((a, b) => a[1].lastChat.time - b[1].lastChat.time));
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  getAllItems() {
    this.apiService.GetAllItems().subscribe((response: any) => {
      this.items = response;

      this.groupByFoodItems = this.groupBy(this.items, (item: { foodItem: any; }) => item.foodItem);
      this.sortedFoodItems = new Map([...this.groupByFoodItems].sort((a, b) => b[1].length - a[1].length));
      this.spliceFoodItems = new Map([...this.sortedFoodItems].splice(0, 10));


      // this.groupByDates = this.groupBy(this.items, (item: { date: any; }) => item.date);

      this.spliceFoodItems.forEach((value: string, key: string) => {
        this.topFoodItems.push(key);
      });
      console.log("this.topFoodItems", this.topFoodItems)

    })
  }

  graph() {
    // this.chart = new Chart("chart1", {
    //   type: "pie",
    //   data: {
    //     labels: [
    //       'Red',
    //       'Blue',
    //       'Yellow'
    //     ],
    //     datasets: [{
    //       label: 'My First Dataset',
    //       data: [300, 50, 100],
    //       backgroundColor: [
    //         'rgb(255, 99, 132)',
    //         'rgb(54, 162, 235)',
    //         'rgb(255, 205, 86)'
    //       ],
    //       // hoverOffset: 4
    //     }]
    //   },
    //   options: {
    //   }
    // });


    // this.chart = new Chart("chart2", {
    //   type: "pie",
    //   data: {
    //     labels: [
    //       'Red',
    //       'Blue',
    //       'Yellow'
    //     ],
    //     datasets: [{
    //       label: 'My First Dataset',
    //       data: [300, 50, 100],
    //       backgroundColor: [
    //         'rgb(255, 99, 132)',
    //         'rgb(54, 162, 235)',
    //         'rgb(255, 205, 86)'
    //       ],
    //       // hoverOffset: 4
    //     }]
    //   },
    //   options: {
    //   }
    // });
  }


}
