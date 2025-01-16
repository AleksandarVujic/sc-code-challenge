import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../models/product';
import { ProductsService } from '../../../services/products-service/products.service';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent implements OnInit {
  products: IProduct[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this._getProducts();
  }

  private _getProducts() {}

  deleteProduct(productId: string) {}

  updateProductRedirect(productId?: string) {
    this.router.navigateByUrl(`product/form/${productId}`);
  }
}
