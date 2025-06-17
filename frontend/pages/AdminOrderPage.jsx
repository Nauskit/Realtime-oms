import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function AdminOrderPage() {
    const { userId } = useParams();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState({});


    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            setError("You must login first");
            return;
        }

        const fetchOrders = async () => {
            setLoading(true);
            let modifyUserId = userId;
            if (modifyUserId.startsWith("$")) {
                modifyUserId = modifyUserId.slice(1);
            }
            try {
                const res = await fetch(`http://localhost:3000/orders/user/${modifyUserId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to fetch orders");

                setOrders(data.getOrder);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();

    }, [userId]);



    const handleStatusChange = (orderId, newStatus) => {
        setSelectedStatus((prev) => ({
            ...prev,
            [orderId]: newStatus,
        }));
    };

    const updateOrderStatus = async (orderId) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            setError("You must login first");
            return;
        }

        const status = selectedStatus[orderId];
        if (!status) {
            alert("Please select a status before updating");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/orders/${orderId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ status }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to update status");

            alert("Order status updated successfully");

        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Order Management</h1>
            {loading && <p>Loading orders...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <table className="w-full table-auto border-collapse bg-white shadow rounded">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 text-left">User</th>
                        <th className="p-2 text-left">Product</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Change Status</th>
                        <th className="p-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) =>
                        order.items.map((item, idx) => (
                            <tr key={`${order._id}-${idx}`}>
                                <td className="p-2">{order.userId?.username || "Unknown"}</td>
                                <td className="p-2">{item.product?.productName || "N/A"}</td>
                                <td className="p-2">{order.status}</td>
                                <td className="p-2">
                                    <select
                                        value={selectedStatus[order._id] || ""}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className="border p-1 rounded"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="p-2">
                                    <button
                                        onClick={() => updateOrderStatus(order._id)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
