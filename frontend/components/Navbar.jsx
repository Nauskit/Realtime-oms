import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='min-h-screen flex bg-gray-100'>
            <aside className='w-64 bg-gray-500 shadow-md p-4'>
                <h2 className='text-xl font-bold mb-4'>OMS DashBoard</h2>
                <nav>
                    <ul className='space-y-2'>
                        <li>
                            <Link to="/product" className='block p-2 rounded hover:bg-gray-200'>
                                Product
                            </Link>
                        </li>
                        <li>
                            <Link to="/users/admin" className='block p-2 rounded hover:bg-gray-200'>
                                User
                            </Link>
                        </li>
                        <li><a href="/setting" className='block p-2 rounded hover:bg-gray-200'>Settings</a></li>
                    </ul>
                </nav>
            </aside>
        </div>
    )
}
