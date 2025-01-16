import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss',
})
export class ProductsFormComponent implements OnInit {
  editmode: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCancel() {
    this.router.navigate(['products']);
  }
}
