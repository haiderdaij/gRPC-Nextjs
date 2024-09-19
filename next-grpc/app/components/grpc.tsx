"use client";
import { useEffect, useState } from "react";
import { ProductItem } from "../../../types/ProductItem";
import { CreateData, DeleteData, ReadData, ReadDataById } from "../lib/data";
import Loading from "./Loading";

const GRPC = () => {
  const [products, setProducts] = useState<ProductItem[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await ReadData();
      const dataById = await ReadDataById(1);
      console.log(dataById);
      setProducts(data);
    };
    fetchData();
    setLoading(false);
  }, []);

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const product = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      category: Number(formData.get("category")),
    };
    await CreateData(product);
    setLoading(false);
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const handleDeleteProduct = async (id: number) => {
    setLoading(true);
    await DeleteData(id);
    setLoading(false);
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className="bg-gray-100 p-4 border-2 border-gray-300 rounded-md w-full">
        <h1 className="text-lg font-bold mb-2">#Create New Product</h1>
        <form onSubmit={handleCreateProduct} className="flex flex-col gap-2">
          <input
            name="name"
            type="text"
            placeholder="Product Name"
            className="p-1 rounded-md border-2 border-gray-300 focus:outline-none placeholder:text-gray-400 placeholder:text-sm"
          />
          <input
            name="description"
            type="text"
            placeholder="Product Description"
            className="p-1 rounded-md border-2 border-gray-300 focus:outline-none placeholder:text-gray-400 placeholder:text-sm"
          />
          <input
            name="price"
            type="number"
            placeholder="Product Price $$$"
            className="p-1 rounded-md border-2 border-gray-300 focus:outline-none placeholder:text-gray-400 placeholder:text-sm"
          />
          <input
            name="category"
            type="number"
            placeholder="Product Category"
            className="p-1 rounded-md border-2 border-gray-300 focus:outline-none placeholder:text-gray-400 placeholder:text-sm"
          />
          <button
            type="submit"
            className="bg-blue-500 w-full text-white text-sm p-1 rounded-md mt-2"
          >
            Create Product
          </button>
        </form>
        <h1 className="text-lg font-bold mt-8 mb-2">#All Product</h1>
        {products && products?.length > 0 ? (
          <div className="flex flex-col gap-2">
            {products?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-row gap-4 w-full h-full"
                >
                  <div className="text-sm">{item.name}</div>
                  <div className="text-sm">{item.description}</div>
                  <div className="text-sm">{item.category}</div>
                  <div>{item.price}</div>
                  <div className="flex ml-auto gap-2">
                    <button
                      className="bg-red-500 text-white text-sm p-1 rounded-md"
                      onClick={() => handleDeleteProduct(item.id as number)}
                    >
                      Delete
                    </button>
                    <button className="bg-blue-500 text-white text-sm p-1 rounded-md">
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm">No Products coming from grpc!</p>
        )}
      </div>
    </>
  );
};

export default GRPC;
