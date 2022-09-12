import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FindCustomerComponent } from './find-customer.component';


describe('FindCustomerComponent', () => {
    let component: FindCustomerComponent;
    let fixture: ComponentFixture<FindCustomerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],

            declarations: [FindCustomerComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FindCustomerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('search text', () => {
    //     component.searchText('jasprit').toBeTruthy();
    // })
});