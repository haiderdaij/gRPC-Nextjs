import * as gRPC from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProductItem } from "../types/ProductItem";
import { ReflectionService } from "@grpc/reflection";

const packageDef = protoLoader.loadSync("../proto/product.proto", {});
const gRPCObject = gRPC.loadPackageDefinition(packageDef);

const productPackage = gRPCObject.product as any;

const products: ProductItem[] = [];

function createProduct(
  call: gRPC.ServerUnaryCall<ProductItem, ProductItem>,
  callback: gRPC.sendUnaryData<ProductItem>
) {
  const data = call.request;

  const newProductData: ProductItem = {
    ...data,
    id: products.length + 1,
  };

  products.push(newProductData);

  return callback(null, newProductData);
}

function readProduct(
  call: gRPC.ServerUnaryCall<{ id: number }, ProductItem>,
  callback: gRPC.sendUnaryData<ProductItem>
) {
  const productId = call.request.id;
  const selectedProduct = products.find((product) => product.id === productId);

  if (selectedProduct) {
    return callback(null, selectedProduct);
  } else {
    callback({
      code: gRPC.status.NOT_FOUND,
      details: "Could not find a product with the specified ID",
    });
  }
}

function readProducts(
  call: gRPC.ServerUnaryCall<{}, { products: ProductItem[] }>,
  callback: gRPC.sendUnaryData<{ products: ProductItem[] }>
) {
  return callback(null, { products });
}

function updateProduct(
  call: gRPC.ServerUnaryCall<ProductItem, ProductItem>,
  callback: gRPC.sendUnaryData<ProductItem>
) {
  const productInfo = call.request;

  const productIndex = products.findIndex(
    (product) => product.id === productInfo.id
  );

  if (productIndex === -1) {
    return callback({
      code: gRPC.status.NOT_FOUND,
      details: "Could not find a product with the specified ID to update",
    });
  }

  const selectedProduct = products[productIndex];

  const updatedProduct: ProductItem = {
    id: selectedProduct.id,
    name: productInfo.name ?? selectedProduct.name,
    description: productInfo.description ?? selectedProduct.description,
    price: productInfo.price ?? selectedProduct.price,
    category: productInfo.category ?? selectedProduct.category,
  };

  products[productIndex] = updatedProduct;

  return callback(null, updatedProduct);
}

function deleteProduct(
  call: gRPC.ServerUnaryCall<{ id: number }, { deleted: boolean }>,
  callback: gRPC.sendUnaryData<{ deleted: boolean }>
) {
  const productId = call.request.id;
  const productIndex = products.findIndex(
    (product) => product.id === productId
  );
  if (productIndex === -1) {
    return callback({
      code: gRPC.status.NOT_FOUND,
      details: "Could not find a product with the specified ID to delete",
    });
  }

  products.splice(productIndex, 1);

  return callback(null, { deleted: true });
}

const server = new gRPC.Server();
const reflection = new ReflectionService(productPackage);
reflection.addToServer(server);

server.addService(productPackage.Product.service, {
  createProduct,
  readProduct,
  readProducts,
  updateProduct,
  deleteProduct,
});

server.bindAsync(
  "0.0.0.0:4000",
  gRPC.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(`Error binding server: ${err}`);
    } else {
      console.log(`Server is running on port ${port}`);
      // server.start();
    }
  }
);
