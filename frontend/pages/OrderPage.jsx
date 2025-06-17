import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    const socket = io('http://localhost:3000')

    const fetchOrderUser = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setError("You must login first");
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/orders/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch");
        }
        setOrders(data.getOrder);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    };

    fetchOrderUser();


    socket.on('orderStatusUpdate', (updateOrder) => {
      setOrders(prevOrders => {
        return prevOrders.map(order =>
          order._id === updateOrder._id ? updateOrder : order
        )
      })
    })

    return () => {
      socket.disconnect();
    }

  }, []);
  return (
    <>
      <div
        className="w-full h-40 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 shadow-lg"
        style={{ backgroundImage: 'url(https://source.unsplash.com/1600x400/?store,shopping)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <h1 className="text-white text-4xl font-extrabold bg-black bg-opacity-40 px-6 py-2 rounded">
          Welcome to Realtime-OMS Store
        </h1>
      </div>
      <main className='flex-1 p-6'>
        <header className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Order Status: user1</h1>
        </header>

        <div className='bg-white rounded-lg shadow mt-10 '>
          <div className='overflow-x-auto'>
            <table className='w-full table-auto border-collapse'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='p-3 text-left'>Product Name</th>
                  <th className='p-3 text-left'>Description</th>
                  <th className='p-3 text-left'>TotalPrice</th>
                  <th className='p-3 text-left'>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  order.items.map((item, index) => (
                    <tr key={`${order._id}-${index}`}>
                      <td className='p-2'>{item.product?.productName}</td>
                      <td className='p-2'>{item.product?.description || 'No description'}</td>
                      <td className='p-2'>{order.totalAmount}</td>
                      <td className='p-2'>{order.status}</td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
