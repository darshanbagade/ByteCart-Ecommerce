import React from 'react'
import { Link } from 'react-router-dom'

function MenuButton() {
  return (
    <div className='grid grid-cols-2 m gap-4 my-6 '>
        <Link to='/orders'>
            <div className='p-6 border-2 rounded text-center cursor-pointer hover:bg-gray-100 lg:py-8 md:py-8 text-xl'>Orders</div>
        </Link>
        <Link to='/account'>
             <div className='p-6 border-2 rounded text-center cursor-pointer hover:bg-gray-100 lg:py-8 md:py-8 text-xl'>Accounts</div>
        </Link>
    </div>
  )
}

export default MenuButton