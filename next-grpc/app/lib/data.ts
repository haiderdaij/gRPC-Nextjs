import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import client from "../utils/grpc-connection";
import { ProductItem } from "../../../types/ProductItem";
import {
  ProductItem as ProductItemProto,
  ProductId,
} from "../../generated/proto/product_pb";

export async function ReadData(): Promise<ProductItem[]> {
  const request = new Empty();

  return new Promise((resolve, reject) => {
    client?.readProducts(request, {}, (err, res) => {
      if (err) {
        console.error("Error fetching products:", err);
        reject([]);
      } else {
        console.log(res);
        const productList = res.getProductsList().map((product: any) => ({
          id: product.getId(),
          name: product.getName(),
          description: product.getDescription(),
          price: product.getPrice(),
          category: product.getCategory(),
        }));
        resolve(productList);
      }
    });
  });
}

export const CreateData = async (product: {
  name: string;
  description: string;
  price: number;
  category: number;
}) => {
  const productMessage = new ProductItemProto();
  productMessage.setName(product.name);
  productMessage.setDescription(product.description);
  productMessage.setPrice(product.price);
  productMessage.setCategory(product.category);

  return new Promise((resolve, reject) => {
    client?.createProduct(productMessage, {}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

export const DeleteData = async (id: number) => {
  const productId = new ProductId();
  productId.setId(id);
  return new Promise((resolve, reject) => {
    client?.deleteProduct(productId, {}, (err, response) => {
      if (err) {
        console.error("Error deleting product:", err);
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

export const ReadDataById = async (id: number): Promise<ProductItem> => {
  const productId = new ProductId();
  productId.setId(id);
  return new Promise((resolve, reject) => {
    client?.readProduct(productId, {}, (err, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.toObject());
      }
    });
  });
};
