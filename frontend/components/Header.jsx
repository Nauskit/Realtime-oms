import React from 'react'

export default function Header() {
    return (
        <nav className='flex justify-between p-3'>
            <div className='mb-8'>
                <h1 className='text-3xl'>Realtime OMS Project</h1>
            </div>
            <ul className='flex justify-between'>
                <li><a href="">Product</a></li>
                <li><a href="">Product</a></li>
                <li><a href="">Product</a></li>
            </ul>
        </nav>
    )
}
