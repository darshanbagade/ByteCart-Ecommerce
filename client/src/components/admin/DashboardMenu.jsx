import {useState} from 'react'
import { NavLink } from 'react-router-dom'
function DashboardMenu() {

  return (
    <div className='grid grid-cols-4 gap-4 mt-4'>
        <NavLink end={true} to='/admin'
          className={({isActive})=>`text-black p-4 border-2 border-black rounded-2xl ${ isActive && "bg-linear-to-br from-gray-300 to-white"   }` }
        >
            <p>Dashboard</p>        
        </NavLink>
        <NavLink end={true} to='/admin/orders'
          className={({isActive})=>`text-black p-4 border-2 border-black rounded-2xl ${ isActive && "bg-linear-to-br from-gray-300 to-white"   }` }
        >
            <p>Orders</p>        
        </NavLink>
        <NavLink end={true} to='/admin/products'
          className={({isActive})=>`text-black p-4 border-2 border-black rounded-2xl ${ isActive && "bg-linear-to-br from-gray-300 to-white"   }` }
        >
            <p>Products</p>        
        </NavLink>
        <NavLink end={true} to='/admin/categories'
          className={({isActive})=>`text-black p-4 border-2 border-black rounded-2xl ${ isActive && "bg-linear-to-br from-gray-300 to-white"   }` }
        >
            <p>Category</p>        
        </NavLink>
       
    </div>
  )
}

export default DashboardMenu