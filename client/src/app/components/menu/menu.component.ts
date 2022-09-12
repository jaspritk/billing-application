import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: any = [];
  menusCopy: any = [];
  menuID: any;
  uniqueCategories: any = [];
  selectedCategory: any;
  isEdit: boolean = false;

  message: string = '';

  categories: any = ['Hot Beverages', 'Cold Beverages', 'Fresh Juice', 'Milk Shake', 'Butter Milk and Lassi', 'Sandwich', 'North Indian', 'South Indian', 'Maggi Parantha', 'Starters', 'Salad', 'Raita', 'Pavbhaji', 'Gujrati Dishes', 'Tawa Chapati', 'Soup', 'Noodles', 'Punjabi', 'Desserts'];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getMenu()
  }

  form = new FormGroup({
    itemName: new FormControl('', Validators.required),
    halfPlatePrice: new FormControl('', Validators.required),
    fullPlatePrice: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });

  getMenu() {
    this.apiService.GetMenu().subscribe(response => {
      this.menus = response;
      this.menusCopy = response;
      this.uniqueCategories = [...new Set(this.menusCopy.map((item: any) => item.category))];
    })
  }

  onChange(event: any) {
    this.selectedCategory = event.target.value;
    this.menus = this.menusCopy.filter((t: any) => {
      if (this.selectedCategory == "") {

        return this.menus
      }
      return t.category == this.selectedCategory;
    })
  }

  addMenu() {
    let formValues = this.form.value;
    // console.log("🚀 ~ file: menu.component.ts ~ line 55 ~ MenuComponent ~ addMenu ~ formValues", formValues)
    if (this.form.value != "") {
      const payload = {
        itemName: formValues.itemName,
        halfPlatePrice: formValues.halfPlatePrice,
        fullPlatePrice: formValues.fullPlatePrice,
        category: formValues.category
      };
      this.apiService.PostMenu(payload).subscribe((response: any) => {
        this.message = response.message;

        setTimeout(() => {
          this.message = '';
        }, 3000);
        this.getMenu();
      })
      this.form.reset();
    }
  }

  patchForm(menu: any) {
    this.form.patchValue({
      itemName: menu.itemName,
      halfPlatePrice: menu.halfPlatePrice,
      fullPlatePrice: menu.fullPlatePrice,
      category: menu.category
    });
    this.menuID = menu._id;
    this.isEdit = true;
  }

  updateMenu() {
    this.isEdit = false;
    let formValues = this.form.getRawValue();
    const payload = {
      itemName: formValues.itemName,
      halfPlatePrice: formValues.halfPlatePrice,
      fullPlatePrice: formValues.fullPlatePrice,
      category: formValues.category
    };
    this.apiService.PutMenu(this.menuID, payload).subscribe((response: any) => {
      this.message = response.message;

      setTimeout(() => {
        this.message = '';
      }, 3000);
      this.getMenu();
    })
    this.form.reset();
  }

  deleteMenu(menu: any) {
    this.apiService.DeleteMenu(menu._id).subscribe((response: any) => {
      this.menus = this.menus.filter((item: any) => item.id != menu.id);
      this.message = response.message;

      setTimeout(() => {
        this.message = '';
      }, 3000);
      this.getMenu();
    });
  }
}
