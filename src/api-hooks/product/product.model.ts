export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface ProductListResponse {
  limit: number;
  total: number;
  skip: number;
  products: Product[];
}

export interface GetProductListInput {
  params?: {
    q?: string;
    limit?: number;
    skip?: number;
  };
}

export interface GetProductInput {
  id: number;
}

export interface CreateProductInput {
  body: {
    title: string;
    description: string;
    category: string;
  };
}

export interface UpdateProductInput {
  id: number;
  body: {
    title: string;
    description: string;
    category: string;
  };
}

export interface DeleteProductInput {
  id: number;
}
