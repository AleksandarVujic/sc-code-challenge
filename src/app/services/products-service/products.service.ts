import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { IProduct } from '../../models/product';
import { IManufacturer } from '../../models/manufacturer';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  manufacturers: IManufacturer[] = [
    { id: 'm1', name: 'Pfizer' },
    { id: 'm2', name: 'Moderna' },
    { id: 'm3', name: 'AstraZeneca' },
    { id: 'm4', name: 'Johnson & Johnson' },
    { id: 'm5', name: 'Hemofarm' },
    { id: 'm6', name: 'Alkaloid' },
  ];

  initialProducts: IProduct[] = [
    {
      id: 'p1',
      name: 'Paracetamol 500mg',
      manufacturer: this.manufacturers[0],
      price: 5.99,
      expiryDate: new Date('2026-12-31'),
    },
    {
      id: 'p2',
      name: 'Vitamin D3 1000IU',
      manufacturer: this.manufacturers[1],
      price: 7.49,
      expiryDate: new Date('2025-06-30'),
    },
    {
      id: 'p3',
      name: 'Ibuprofen 200mg',
      manufacturer: this.manufacturers[2],
      price: 4.99,
      expiryDate: new Date('2027-03-15'),
    },
    {
      id: 'p4',
      name: 'Cough Syrup',
      manufacturer: this.manufacturers[3],
      price: 6.99,
      expiryDate: new Date('2024-11-20'),
    },
    {
      id: 'p5',
      name: 'Multivitamin Tablets',
      manufacturer: this.manufacturers[1],
      price: 12.49,
      expiryDate: new Date('2026-08-05'),
    },
    {
      id: 'p6',
      name: 'Amoxicilin',
      manufacturer: this.manufacturers[4],
      price: 32.49,
      expiryDate: new Date('2026-07-05'),
    },
    {
      id: 'p7',
      name: 'Cafetin',
      manufacturer: this.manufacturers[5],
      price: 2.49,
      expiryDate: new Date('2029-07-10'),
    },
  ];

  private productsSubject = new BehaviorSubject<IProduct[]>([
    ...this.initialProducts,
  ]);
  products$ = this.productsSubject.asObservable();

  constructor() {}

  getProducts(): Observable<IProduct[]> {
    return this.products$;
  }

  getProductById(id: string): Observable<IProduct | undefined> {
    const product = this.productsSubject.value.find(
      (product) => product.id === id
    );
    return of(product);
  }

  addProduct(product: IProduct): void {
    const currentProducts = this.productsSubject.value;
    this.productsSubject.next([...currentProducts, product]);
  }

  updateProduct(id: string, updatedProduct: Partial<IProduct>): void {
    const currentProducts = this.productsSubject.value.map(
      (product: IProduct) =>
        product.id === id ? { ...product, ...updatedProduct } : product
    );
    this.productsSubject.next(currentProducts);
  }

  deleteProduct(id: string): void {
    const currentProducts = this.productsSubject.value.filter(
      (product: IProduct) => product.id !== id
    );
    this.productsSubject.next(currentProducts);
  }

  getManufacturers(): Observable<IManufacturer[]> {
    return of(this.manufacturers);
  }
}
