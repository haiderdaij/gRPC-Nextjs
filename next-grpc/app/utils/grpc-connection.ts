import { ProductClient } from "@/generated/proto/ProductServiceClientPb";

let client: ProductClient | null = null;

if (typeof window !== "undefined") {
  client = new ProductClient("http://localhost:8080", null, null);
}

export default client;
