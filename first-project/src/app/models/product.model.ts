export interface ResponseProductModel {
  code: string,
  message: string,
  data: ProductModel[]
}

export interface ProductModel {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}
