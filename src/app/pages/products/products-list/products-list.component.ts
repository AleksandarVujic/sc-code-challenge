import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { IProduct } from '../../../models/product';
import { MessageComponent } from '../../../shared/message/message.component';
import { ProductsService } from '../../../services/products-service/products.service';
import { MessageService } from '../../../services/message-service/message.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, RouterLink, MessageComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent implements OnInit {
  products: IProduct[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this._getProducts();
  }

  private _getProducts() {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  deleteProduct(id: string): void {
    try {
      this.productService.deleteProduct(id);

      this.messageService.add({
        severity: 'success',
        summary: 'Success!',
        detail: 'Product deleted!',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error!',
        detail: 'Something went wrong.',
      });
    }
  }

  updateProductRedirect(productId: string) {
    this.router.navigate([`/products/form/${productId}`]);
  }
}
