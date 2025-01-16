import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { IProduct } from '../../../models/product';
import { IManufacturer } from '../../../models/manufacturer';
import { ProductsService } from '../../../services/products-service/products.service';
import { MessageService } from '../../../services/message-service/message.service';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss',
})
export class ProductsFormComponent implements OnInit {
  editMode: boolean = false;
  manufacturers: IManufacturer[] = [];
  currentProductId!: string;
  productForm!: FormGroup;
  minDate: string | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._initializeForm();
    this._checkEditMode();
    this._loadManufacturers();

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  private _initializeForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      manufacturer: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      expiryDate: ['', Validators.required],
    });
  }

  private _loadManufacturers(): void {
    this.productsService.getManufacturers().subscribe((manufacturers) => {
      this.manufacturers = manufacturers;
    });
  }

  private _checkEditMode(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentProductId = params['id'];
        this.productsService
          .getProductById(this.currentProductId)
          .subscribe((product) => {
            if (product) {
              this.productForm.patchValue({
                name: product.name,
                manufacturer: product.manufacturer.id,
                price: product.price,
                expiryDate: new Date(product.expiryDate)
                  .toISOString()
                  .slice(0, 10),
              });
            }
          });
      }
    });
  }

  private _addProduct(product: IProduct) {
    try {
      this.productsService.addProduct(product);
      this.messageService.add({
        severity: 'success',
        summary: 'Success!',
        detail: 'Successfully created new product.',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error!',
        detail: 'Something went wrong.',
      });
    }
  }

  private _updateProduct(product: IProduct) {
    try {
      this.productsService.updateProduct(this.currentProductId, product);
      this.messageService.add({
        severity: 'success',
        summary: 'Success!',
        detail: 'Product updated.',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error!',
        detail: 'Something went wrong.',
      });
    }
  }

  onSubmit(): void {
    console.log(this.productForm.invalid);
    if (this.productForm.invalid) return;

    const product: IProduct = {
      id: this.editMode ? this.currentProductId : this._generateId(),
      name: this.productForm.value.name,
      manufacturer: this.manufacturers.find(
        (manufact) => manufact.id === this.productForm.value.manufacturer
      )!,
      price: this.productForm.value.price,
      expiryDate: new Date(this.productForm.value.expiryDate),
    };

    if (this.editMode) {
      this._updateProduct(product);
    } else {
      this._addProduct(product);
    }
    this.router.navigate(['products']);
  }

  onCancel() {
    this.router.navigate(['products']);
  }

  private _generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
