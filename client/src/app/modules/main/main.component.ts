import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  images: any = [];
  imageIndex: any = 0;
  constructor() { }

  ngOnInit(): void {
    this.images = ['./assets/images/sun-solid.svg', './assets/images/moon-solid.svg']
  }
  toggleTheme() {
    this.imageIndex++;
    if (this.imageIndex === this.images.length) {
      this.imageIndex = 0;
    }
    document.body.classList.toggle('dark');
  }

}
