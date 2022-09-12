import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://192.168.24.181:3000";
  }

  // CUSTOMER

  GetCustomer() {
    return this.http.get(`${this.ROOT_URL}/customer`);
  }

  PostCustomer(payload: any) {
    return this.http.post(`${this.ROOT_URL}/customer`, payload);
  }

  PutCustomer(id: any, payload: any) {
    return this.http.put(`${this.ROOT_URL}/customer/${id}`, payload);
  }

  SearchForCustomer(key: string) {
    return this.http.get(`${this.ROOT_URL}/customer/${key}`);
  }

  // BILL DETAILS

  GetBill(customerId: string) {
    return this.http.get(`${this.ROOT_URL}/bill/${customerId}`);
  }

  PostBill(customerId: any, payload: any) {
    return this.http.post(`${this.ROOT_URL}/bill/${customerId}`, payload);
  }

  GetAllItems() {
    return this.http.get(`${this.ROOT_URL}/bill`);
  }

  // DRAWER

  GetDrawer() {
    return this.http.get(`${this.ROOT_URL}/drawer`);
  }

  PostDrawer(payload: any) {
    return this.http.post(`${this.ROOT_URL}/drawer`, payload);
  }

  PutDrawer(id: any, payload: any) {
    return this.http.put(`${this.ROOT_URL}/drawer/${id}`, payload);
  }

  DeleteDrawer(id: any) {
    return this.http.delete(`${this.ROOT_URL}/drawer/${id}`);
  }

  // MENU

  GetMenu() {
    return this.http.get(`${this.ROOT_URL}/menu`);
  }

  PostMenu(payload: any) {
    return this.http.post(`${this.ROOT_URL}/menu`, payload);
  }

  PutMenu(id: any, payload: any) {
    return this.http.put(`${this.ROOT_URL}/menu/${id}`, payload);
  }

  DeleteMenu(id: any) {
    return this.http.delete(`${this.ROOT_URL}/menu/${id}`);
  }

  // GET WHOLE DATA
  GetWholeData(payload: any) {
    return this.http.post(`${this.ROOT_URL}/data`, payload);
  }
}
