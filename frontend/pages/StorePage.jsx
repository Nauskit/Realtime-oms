import React, { useEffect, useState } from "react";
import io from "socket.io-client";

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [addCart, setAddCart] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/product");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to load products");
        }
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();

    const socket = io("http://localhost:3000");

    const handleNewProduct = (newProduct) => {
      setProducts((prevProducts) => [newProduct, ...prevProducts]);
    };
    socket.on("newProduct", handleNewProduct);

    return () => {
      socket.off("newProduct", handleNewProduct);
      socket.disconnect();
    };
  }, []);

  const handleClickAdd = () => {
    setAddCart(addCart + 1);
  };

  const handleClickCheck = () => {
    setAddCart(0);
  };

  return (
    <main className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Store</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex">
          <div className="mr-2">{addCart}</div>
          <div onClick={handleClickCheck}>check out</div>
        </button>
      </header>

      {error && (
        <div className="bg-red-100 text-red-800 p-2 rounded mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded shadow p-4">
            <img className="w-100 h-40" src={product.imageUrl}></img>
            <h2 className="text-lg font-bold">{product.productName}</h2>
            <p className="text-sm text-gray-600 mb-2">Stock: {product.stock}</p>
            <p className="text-sm mb-4">Price: ${product.price}</p>
            <button
              onClick={handleClickAdd}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
