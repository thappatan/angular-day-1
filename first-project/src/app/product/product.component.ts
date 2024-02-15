import { Component, OnInit } from "@angular/core";

import { ProductServcie } from "../services/product.service";
import { ProductModel } from "../models/product.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss",
  providers: [ConfirmationService, MessageService]
})
export class ProductComponent implements OnInit {
  newProductDialog: boolean = false;
  editProductDialog: boolean = false;

  productList: ProductModel[] = [];

  productForm: FormGroup = new FormGroup({
    id: new FormControl(undefined),
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
  });

  constructor(private productService: ProductServcie, private confirmationService: ConfirmationService, private messageService: MessageService) {}

  ngOnInit() {
    console.log("ProductComponent initialized");
    this.getProductList();
  }

  getProductList() {
    this.productService.getProductList().subscribe((response) => {
      this.productList = response.data;
    });
  }

  createProduct(product: ProductModel) {
    this.productService.createProduct(product).subscribe((response) => {
      if(response.code === "TXN001"){
        this.getProductList();
        this.closeNewProductDialog();
        this.productForm.reset();
      }
    });
  }

  updateProduct(product: ProductModel){
    this.productService.updateProduct(product).subscribe((response) => {
      if(response.code === "TXN000"){
        this.getProductList();
        this.closeEditProductDialog();
        this.productForm.reset();
      }
    });
  }

  deleteProduct(product: ProductModel){
    this.productService.deleteProduct(product).subscribe((response) => {
      if(response.code === "TXN000"){
        this.getProductList();
        this.productForm.reset();
      }
    });
  }

  showNewProductDialog() {
    this.newProductDialog = true;
  }

  closeNewProductDialog() {
    this.newProductDialog = false;
  }

  showEditProductDialog() {
    this.editProductDialog = true;
  }

  closeEditProductDialog() {
    this.editProductDialog = false;
  }

  onNewProductFormSubmit() {
    const newProduct: ProductModel = { ...this.productForm.value };
    this.createProduct(newProduct);
  }

  onEditProductFormSubmit() {
    const editProduct: ProductModel = { ...this.productForm.value };
    this.updateProduct(editProduct);
  }

  onClickEdit(product: ProductModel){
    this.productForm.patchValue({...product});
    this.showEditProductDialog();
  }

  onClickDelete(product: ProductModel){
    this.productForm.patchValue({...product});
    this.confirmDelete();
  }

  confirmDelete() {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
          this.deleteProduct({...this.productForm.value});
        },
        reject: () => {
        }
    });
}
}
