import React from 'react'
import {Navbar, CartList, Footer} from '../components/index'
import { ScrollToTop } from '../utils/ScrollToTop'

function Cart() {
  return (
    <div >
        <ScrollToTop/>
        <CartList/>
    </div>
  )
}


export default Cart