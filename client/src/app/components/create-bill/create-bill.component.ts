import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {

  // for drawers api
  drawers: any = [];
  selectedDrawerName: any;
  selectedDrawerPhone: any;

  // For Menus api
  menus: any = [];
  customerId: any;
  isEdit: boolean = false;
  array: any = [];
  pricePerPlate: any;
  subtotal: any;
  total: any;
  grandtotal: any;
  gst: any;
  itemId: any;
  targetObject: any;
  message: string = '';

  itemName: any;
  quantity: any = '';
  plateType: any = '';
  targetIndex: any;

  noOfPeople: any;
  perHead: any;

  showNew: boolean = true;
  showOld: boolean = false;

  searchedPhone?: number;
  oldCustomerId: any;
  oldCustomerName: any;
  oldCustomerEmail: any;
  oldCustomerPhone: any;
  customers: any = [];

  date = moment();

  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  customerForm = this.fb.group({
    customerName: ['', Validators.required],
    customerEmail: ['', [Validators.required, Validators.email]],
    customerPhone: ['', [Validators.required, Validators.maxLength(10)]],
    drawerName: ['', Validators.required],
    drawerPhone: [{ value: '', disabled: true }],
    total: [{ value: '', disabled: true }],
    grandtotal: [{ value: '', disabled: true }]
  });

  billForm = this.fb.group({
    itemName: ['', Validators.required],
    quantity: ['', Validators.required],
    plateType: ['', Validators.required],
    pricePerPlate: [{ value: '', disabled: true }],
    subtotal: [{ value: '', disabled: true }]
  });

  ngOnInit(): void {
    this.getDrawer();
    this.getMenu();
    this.getCustomer()
  }

  getDrawer() {
    this.apiService.GetDrawer().subscribe(response => {
      this.drawers = response;
    })
  }

  getDrawerName(event: any) {
    this.selectedDrawerName = event.target.value;
    this.drawers.forEach((element: any) => {
      if (element.drawerName == this.selectedDrawerName) {
        this.selectedDrawerPhone = element.drawerPhone;
      }
    });
    this.customerForm.patchValue({
      drawerPhone: this.selectedDrawerPhone
    })
  }

  getMenu() {
    this.apiService.GetMenu().subscribe(response => {
      this.menus = response;
    })
  }

  postCustomer() {
    const formValues = this.customerForm.getRawValue();
    this.apiService.PostCustomer(formValues).subscribe((response: any) => {
      this.customerId = response.created._id;
      this.message = response.message;
      setTimeout(() => {
        this.message = '';
      }, 2000);
    })
  }

  postBill() {
    this.array.forEach((element: any) => {
      const payload = {
        foodItem: element.itemName,
        quantity: element.quantity,
        plateType: element.plateType,
        pricePerPlate: element.pricePerPlate,
        subtotal: element.subtotal
      }
      this.apiService.PostBill(this.customerId, payload).subscribe((response: any) => {
        this.message = response.message;

        setTimeout(() => {
          this.message = '';
        }, 2000);
      })
    });
  }

  onChange() {
    let formValues = this.billForm.getRawValue();

    this.menus.forEach((menu: any) => {

      if (menu.itemName == formValues.itemName) {
        if (formValues.plateType == 'half-plate') {
          this.pricePerPlate = menu.halfPlatePrice;
        }
        if (formValues.plateType == 'full-plate') {
          this.pricePerPlate = menu.fullPlatePrice;
        }
      }
      this.subtotal = Number(formValues.quantity) * this.pricePerPlate;
      this.billForm.patchValue({
        pricePerPlate: this.pricePerPlate,
        subtotal: this.subtotal
      })
    });
  }

  onSubmit() {
    let formValues = this.billForm.getRawValue();
    this.array.push(formValues);

    this.total = this.array.reduce((accumulator: any, current: any) => accumulator + current.subtotal, 0);
    this.gst = 0.05 * this.total;
    this.grandtotal = this.total + this.gst;
    this.customerForm.patchValue({
      total: this.total,
      grandtotal: this.grandtotal
    })
    this.billForm.reset()
  }

  patchItem(item: any, index: any) {
    this.targetIndex = index;
    this.targetObject = this.array[this.targetIndex];

    this.billForm.patchValue({
      itemName: item.itemName,
      quantity: item.quantity,
      plateType: item.plateType,
      pricePerPlate: item.pricePerPlate,
      subtotal: item.subtotal
    });
    this.isEdit = true;
  }

  updateItem() {
    this.isEdit = false;
    let formValues = this.billForm.getRawValue();
    this.targetObject.itemName = formValues.itemName;
    this.targetObject.quantity = formValues.quantity;
    this.targetObject.plateType = formValues.plateType;
    this.targetObject.pricePerPlate = formValues.pricePerPlate;
    this.targetObject.subtotal = formValues.subtotal;

    this.billForm.reset();
  }

  deleteitem(index: any) {
    this.targetIndex = index;
    this.targetObject = this.array[this.targetIndex];
    this.array.splice(this.targetIndex, 1);
    this.onChange()
  }

  resetForm() {
    this.customerForm.reset();
    this.billForm.reset();
    this.array = [];
  }

  split() {
    this.perHead = Math.ceil(this.grandtotal / this.noOfPeople)
  }

  showNewForm() {
    this.showNew = true;
    this.showOld = false;
  }

  showOldForm() {
    this.showOld = true;
    this.showNew = false;
  }

  getCustomer() {
    this.apiService.GetCustomer().subscribe((response: any) => {
      this.customers = response;
    })
  }

  onSearch() {
    this.customers.forEach((element: any) => {
      if (element.customerPhone == this.searchedPhone) {
        this.oldCustomerId = element._id
        this.oldCustomerName = element.customerName
        this.oldCustomerEmail = element.customerEmail
        this.oldCustomerPhone = element.customerPhone
      }
    });
  }

  postAppendBill() {
    this.array.forEach((element: any) => {
      const payload = {
        foodItem: element.itemName,
        quantity: element.quantity,
        plateType: element.plateType,
        pricePerPlate: element.pricePerPlate,
        subtotal: element.subtotal
      }
      this.apiService.PostBill(this.oldCustomerId, payload).subscribe((response: any) => {
        this.message = response.message;

        setTimeout(() => {
          this.message = '';
        }, 2000);
        console.log("response PostBill", response);
      })
    });
  }

  data() {

    let payload = {
      customer: this.customerForm.getRawValue(),
      bill: this.array,
      date: moment(this.date).format('LL')
    }
    console.log("🚀 ~ file: create-bill.component.ts ~ line 260 ~ CreateBillComponent ~ data ~ payload", payload);

    this.apiService.GetWholeData(payload).subscribe((response: any) => {
      console.log(response);

      this.message = response.message;

      setTimeout(() => {
        this.message = '';
      }, 2000);
    });
  }

  regdata() {

    let payload = {
      customer: {
        customerName: this.oldCustomerName,
        customerEmail: this.oldCustomerEmail,
        customerPhone: this.oldCustomerPhone,
        total: this.total,
        grandtotal: this.grandtotal
      },
      bill: this.array,
      date: moment(this.date).format('LL')
    }
    console.log("🚀 ~ file: create-bill.component.ts ~ line 260 ~ CreateBillComponent ~ data ~ payload", payload);

    this.apiService.GetWholeData(payload).subscribe((response: any) => {
      console.log(response);

      this.message = response.message;

      setTimeout(() => {
        this.message = '';
      }, 2000);
    });
  }
}