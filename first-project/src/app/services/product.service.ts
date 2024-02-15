import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ProductModel, ResponseProductModel } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class ProductServcie {
  constructor(private httpClient: HttpClient){}

  getProductList() {
    return this.httpClient.get<ResponseProductModel>(`/api/products`);
  }

  createProduct(product: ProductModel){
    return this.httpClient.post<ResponseProductModel>(`/api/products`, product);
  }

  updateProduct(product: ProductModel){
    return this.httpClient.put<ResponseProductModel>(`/api/products/${product.id}`, product);
  }

  deleteProduct(product: ProductModel){
    return this.httpClient.delete<ResponseProductModel>(`/api/products/${product.id}`)
  }

}
