import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'layout',
  templateUrl: './layout.html'
})
export class Layout implements OnInit {


  selectedCar!: number;

  cars = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Saab' },
      { id: 3, name: 'Opel' },
      { id: 4, name: 'Audi' },
  ];

  car1 = { id: 1, name: 'Volvo' }

  constructor() {
  }

  ngOnInit(): void {
   
  }
}

