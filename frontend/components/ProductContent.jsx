import React, { useEffect, useState } from 'react'

export default function ProductContent() {
    const [product, setProduct] = useState([]);

    const fetchProduct = async () => {
        try {
            const res = await fetch('http://localhost:3000/products')
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch");
            }

            setProduct(data || []);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchProduct();
    }, []);


    return (
        <>
            <main className='flex-1 p-6'>
                <header className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold'>Product</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Create Order
                    </button>
                </header>

                <div className='bg-white rounded-lg shadow mt-10 '>
                    <div className='overflow-x-auto'>
                        <table className='w-full table-auto border-collapse'>
                            <thead>
                                <tr className='bg-gray-200'>
                                    <th className='p-3 text-left '>Product Name</th>
                                    <th className='p-3 text-left'>Description</th>
                                    <th className='p-3 text-left'>Price</th>
                                    <th className='p-3 text-left'>Stock</th>
                                    <th className='p-3 text-left'>Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.map((item) => (
                                    <tr key={item._id}>
                                        <td className=' p-2'>{item.productName}</td>
                                        <td className=' p-2'>{item.description}</td>
                                        <td className=' p-2'>{item.price}</td>
                                        <td className=' p-2'>{item.stock}</td>
                                        <td>
                                            <button className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'>
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}