import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CreateBillComponent } from './create-bill.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

describe('CreateBillComponent', () => {
    let component: CreateBillComponent;
    let fixture: ComponentFixture<CreateBillComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({

            imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],

            declarations: [CreateBillComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CreateBillComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("valid if customerForm is invalid", () => {
        component.customerForm.setValue({
            "customerName": "",
            "customerEmail": "invalidemail",
            "customerPhone": "1234567",
            "drawerName": "",
            "drawerPhone": null,
            "total": null,
            "grandtotal": null
        })
        expect(component.customerForm.valid).toEqual(false);
    });

    it("valid if customerForm is valid", () => {
        component.customerForm.setValue({
            "customerName": "Jasprit Kaur",
            "customerEmail": "jaspritkaur@gmail.com",
            "customerPhone": "7228048035",
            "drawerName": "Neel Prajapati",
            "drawerPhone": null,
            "total": null,
            "grandtotal": null
        })
        expect(component.customerForm.valid).toEqual(true);
    });

    it("valid if billForm is invalid", () => {
        component.billForm.setValue({
            "itemName": "",
            "quantity": "",
            "plateType": "",
            "pricePerPlate": null,
            "subtotal": null
        })
        expect(component.billForm.valid).toEqual(false);
    });

    it("valid if billForm is valid", () => {
        component.billForm.setValue({
            "itemName": "Tea",
            "quantity": "10",
            "plateType": "half-plate",
            "pricePerPlate": null,
            "subtotal": null
        })
        expect(component.billForm.valid).toEqual(true);
    });
});