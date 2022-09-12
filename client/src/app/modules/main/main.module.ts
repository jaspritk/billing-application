import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main.component';
import { AddDrawerComponent } from 'src/app/components/add-drawer/add-drawer.component';
import { CreateBillComponent } from 'src/app/components/create-bill/create-bill.component';
import { FindCustomerComponent } from 'src/app/components/find-customer/find-customer.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { ItemsModalComponent } from 'src/app/components/items-modal/items-modal.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    AddDrawerComponent,
    CreateBillComponent,
    FindCustomerComponent,
    MenuComponent,
    ItemsModalComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports: [
    MainComponent,

  ]
})
export class MainModule { }
