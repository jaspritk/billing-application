import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddDrawerComponent } from 'src/app/components/add-drawer/add-drawer.component';
import { CreateBillComponent } from 'src/app/components/create-bill/create-bill.component';
import { FindCustomerComponent } from 'src/app/components/find-customer/find-customer.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';


const routes: Routes = [
  { path: 'createBill', component: CreateBillComponent },
  { path: 'addDrawer', component: AddDrawerComponent },
  { path: 'findCustomer', component: FindCustomerComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
