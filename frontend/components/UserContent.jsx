import { useEffect, useState } from "react"


export default function UserContent() {
    const [users, setUser] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');

        fetch('http://localhost:3000/users/admin', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(async (res) => {
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Fetch failed');
            }
            return res.json();
        }).then(data => setUser(data))
            .catch(err => {
                console.log(err);
                setError(err.message);
            });
    }, []);

    return (
        <>
            <main className='flex-1 p-6'>
                <header className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-bold'>User</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Create User
                    </button>
                </header>

                {error && (
                    <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">
                        {error}
                    </div>
                )}

                {!error && (
                    <div className='bg-white rounded-lg shadow mt-10 '>
                        <div className='overflow-x-auto'>
                            <table className='w-full table-auto border-collapse'>
                                <thead>
                                    <tr className='bg-stone-400'>
                                        <th className='p-3 text-left'>Username</th>
                                        <th className='p-3 text-left'>Email</th>
                                        <th className='p-3 text-left'>Create-At</th>
                                        <th className='p-3 text-left'>Order Status</th>
                                        <th className='p-3 text-left'>Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => {
                                        return (
                                            <tr key={user.id}>
                                                <td className=' p-2'>{user.username}</td>
                                                <td className=' p-2'>{user.email}</td>
                                                <td className=' p-2'>{user.createdAt}</td>
                                                <td className=' p-2'>Pending</td>
                                                <td>
                                                    <button className='bg-gray-500 text-white px-3 py-1 rounded hover:bg-green-600'>
                                                        Update
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}
