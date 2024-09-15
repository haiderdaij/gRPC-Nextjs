"use client";
import React, { useEffect, useState } from "react";
import { ProductClient } from "../../generated/proto/ProductServiceClientPb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
}

const GRPC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  let client: ProductClient | null = null;

  if (typeof window !== "undefined") {
    client = new ProductClient("http://localhost:8080", null, null);
  }

  const getData = async () => {
    return new Promise<ProductProps[]>((resolve, reject) => {
      const request = new Empty();
      if (client !== null) {
        client.readProducts(request, {}, (err, res) => {
          if (err) {
            console.error("Error fetching products:", err);
            return reject(err);
          }
          const productList: ProductProps[] = res
            .getProductsList()
            .map((product: any) => ({
              id: product.getId(),
              name: product.getName(),
              description: product.getDescription(),
              price: product.getPrice(),
              category: product.getCategory(),
            }));

          console.log(productList);
          resolve(productList);
        });
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getData();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {products?.length > 0 ? (
        <>
          {products?.map((item) => {
            return (
              <div key={item.id} className="flex flex-row gap-4">
                <div>{item.name}</div>
                <div>{item.description}</div>
                <div>{item.category}</div>
                <div>{item.price}</div>
              </div>
            );
          })}
        </>
      ) : (
        <>Go away!</>
      )}
    </div>
  );
};

export default GRPC;
