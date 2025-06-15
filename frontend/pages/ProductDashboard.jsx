import Navbar from '../components/Navbar'
import ProductContent from '../components/ProductContent'


export default function OrderDashboard() {
    return (
        <div className='flex min-h-screen'>
            <Navbar />
            <main className='flex-1'>
                <ProductContent />
            </main>
        </div>
    )
}
