import { Link } from 'react-router-dom'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50'>
        <Link to="/" className='text-2xl font-bold tracking-tight text-yellow-400 hover:text-yellow-300 transition' > Ecomm-Assignment</Link>
         <span className="text-sm text-gray-400">Leegality Frontend Assessment</span>
    </nav>

  )
}

export default Navbar