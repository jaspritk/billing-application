import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [MenuComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be invalid if form value is invalid', () => {
        component.form.setValue({
            "itemName": "",
            "halfPlatePrice": "",
            "fullPlatePrice": "",
            "category": "",
        });
        expect(component.form.valid).toEqual(false);
    });

    it('should be valid if form value is valid', () => {
        component.form.setValue({
            "itemName": "Panipuri",
            "halfPlatePrice": "10",
            "fullPlatePrice": "20",
            "category": "Snacks",
        });
        expect(component.form.valid).toEqual(true);
    });
});