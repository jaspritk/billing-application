import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AddDrawerComponent } from './add-drawer.component';

describe('AddDrawerComponent', () => {
    let component: AddDrawerComponent;
    let fixture: ComponentFixture<AddDrawerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],

            declarations: [AddDrawerComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AddDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be invalid if form value is invalid', () => {
        component.form.setValue({
            "drawerName": "",
            "drawerPhone": "121212",
            "drawerEmail": "invalidemail",
            "drawerAddress": "",
            "drawerCity": "",
            "drawerState": "",
        });
        expect(component.form.valid).toEqual(false);
    });

    it('should be valid if form value is valid', () => {
        component.form.setValue({
            "drawerName": "Jasprit Kaur",
            "drawerPhone": "7228048035",
            "drawerEmail": "jasprit@gmail.com",
            "drawerAddress": "Samrat Nagar Society",
            "drawerCity": "Mehsana",
            "drawerState": "Gujrat",
        });
        expect(component.form.valid).toEqual(true);
    });
});