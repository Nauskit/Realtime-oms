import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState(null);
  const [order, setOrder] = useState(0);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');


    const fetchUser = async () => {
      if (!accessToken) {
        setUsername(null);
        return
      }

      try {
        const res = await fetch('http://localhost:3000/users', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch user')
        }
        setUsername(data.username);
      } catch (err) {
        setError(err.message);
        setUsername(null)
      }
    };




    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
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
    fetchUser();

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
    setOrder(order + 1);
  };

  const handleClickCheck = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setError("You must login before checking out");
      return;
    }

    if (!cart.length === 0) {
      setError("Your cart is empty!");
      return;
    }

    const items = cart.map(product => ({
      product: product._id,
      quantity: 1
    }));

    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0)


    try {
      const res = await fetch('http://localhost:3000/orders', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          items,
          totalAmount
        })
      })
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to checkout");
      }
      setCart([]);
      alert("Checkout Successful!")
    } catch (err) {
      console.log(err.message);
    }
  };


  return (
    <main className="p-6">
      <header className="mb-6">
        <div
          className="w-full h-40 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 shadow-lg"
          style={{ backgroundImage: 'url(https://source.unsplash.com/1600x400/?store,shopping)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <h1 className="text-white text-4xl font-extrabold bg-black bg-opacity-40 px-6 py-2 rounded">
            Welcome to Realtime-OMS Store
          </h1>
        </div>

        {/* Navbar */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Store</h2>
          <div className="flex gap-3 items-center">
            <button
              onClick={handleClickCheck}
              className="bg-gray-200 border border-gray-300 px-4 py-2 rounded hover:bg-blue-700 hover:text-white flex items-center gap-2 transition-colors"
            >
              <span className="text-red-700 font-semibold">{order}</span>
              <span>Check Out</span>
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
              <Link to='/order'>Order</Link>
            </button>

            {username ? (
              <div className="flex gap-2 items-center">
                <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                  {username}
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    setUsername(null);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {
        error && (
          <div className="bg-red-100 text-red-800 p-2 rounded mb-4">{error}</div>
        )
      }

      <div className="flex gap-6 flex-wrap">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded shadow p-4 max-w-[290px] w-full ">
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
    </main >
  );
}
