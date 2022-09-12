import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
// import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-drawer',
  templateUrl: './add-drawer.component.html',
  styleUrls: ['./add-drawer.component.css']
})
export class AddDrawerComponent implements OnInit {

  drawers: any = [];
  drawerId: any;
  isEdit: boolean = false;
  message: string = '';
  // , private toastr: ToastrModule
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getDrawer()
  }

  form = new FormGroup({
    drawerName: new FormControl('', Validators.required),
    drawerPhone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    drawerEmail: new FormControl('', [Validators.required, Validators.email]),
    drawerAddress: new FormControl('', Validators.required),
    drawerCity: new FormControl('', Validators.required),
    drawerState: new FormControl('', Validators.required),
  });

  getDrawer() {
    this.apiService.GetDrawer().subscribe(response => {
      this.drawers = response;
    })
  }

  addDrawer() {
    let formValues = this.form.getRawValue();
    console.log("🚀 ~ file: add-drawer.component.ts ~ line 39 ~ AddDrawerComponent ~ addDrawer ~ formValues", formValues)
    const payload = {
      drawerName: formValues.drawerName,
      drawerPhone: formValues.drawerPhone,
      drawerEmail: formValues.drawerEmail,
      drawerAddress: formValues.drawerAddress,
      drawerCity: formValues.drawerCity,
      drawerState: formValues.drawerState
    };
    this.apiService.PostDrawer(payload).subscribe((response: any) => {
      this.message = response.message;

      setTimeout(() => {
        this.message = '';
      }, 3000);

      console.log(response.message);
      this.getDrawer();
    })
    this.form.reset();
  }

  patchForm(drawer: any) {
    this.form.patchValue({
      drawerName: drawer.drawerName,
      drawerPhone: drawer.drawerPhone,
      drawerEmail: drawer.drawerEmail,
      drawerAddress: drawer.drawerAddress,
      drawerCity: drawer.drawerCity,
      drawerState: drawer.drawerState
    });
    this.drawerId = drawer._id;
    this.isEdit = true;
  }

  updateDrawer() {
    this.isEdit = false;
    let formValues = this.form.getRawValue();
    const payload = {
      drawerName: formValues.drawerName,
      drawerPhone: formValues.drawerPhone,
      drawerEmail: formValues.drawerEmail,
      drawerAddress: formValues.drawerAddress,
      drawerCity: formValues.drawerCity,
      drawerState: formValues.drawerState
    };
    this.apiService.PutDrawer(this.drawerId, payload).subscribe((response: any) => {
      this.message = response.message;

      setTimeout(() => {
        this.message = '';
      }, 3000);
      this.getDrawer();
    })
    this.form.reset();
  }

  deleteDrawer(drawer: any) {
    this.apiService.DeleteDrawer(drawer._id).subscribe((response: any) => {
      this.drawers = this.drawers.filter((item: any) => item.id != drawer.id);
      this.message = response.message;

      setTimeout(() => {
        this.message = '';
      }, 3000);
      this.getDrawer();

    })
  }
}
