import Navbar from '../components/Navbar'
import UserContent from '../components/UserContent'

export default function UserDashboard() {
    return (
        <div className='flex min-h-screen'>
            <Navbar />
            <main className='flex-1'>
                <UserContent />
            </main>
        </div>
    )
}
