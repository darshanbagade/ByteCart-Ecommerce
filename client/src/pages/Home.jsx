import React from 'react'
import { Navbar,Hero, CategoryMenu, ProductList, Footer } from '../components/index.js'
function Home() {
  return (
    <div >
        <Navbar/>
        <Hero/>
        <CategoryMenu/>
        <ProductList category='Mobile'/>
        <ProductList category='Laptop'/>
        <ProductList category='Headphones'/>
        <Footer/>
        
    </div>
  )
}

export default Home