import { Routes , Route, BrowserRouter } from "react-router-dom";
import {Home, ProductPage, AccountMenuPage, AccountPage, OrderPage, Dashboard,Layout, CartLayout, Orders, Product, Category, Cart} from "./pages/index";
import { AddProduct, EditProduct, EditCategory, AddCategory, Checkout } from "./components";
import {ScrollToTop} from './utils/ScrollToTop'
function App() {
  return (
    <div  className='container mx-auto px-2 md:px-32 lg:px-32'>
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path="/:slug" element={ <ProductPage/> }/>
          <Route path="/cart" element={ <CartLayout/> }>
            <Route index element={<Cart/>}/>
            <Route path='/cart/checkout' element={<Checkout/>}/>
          </Route>
          <Route path="/account-menu" element={ <AccountMenuPage/> }/>
          <Route path="/account" element={ <AccountPage/> }/>
          <Route path="/orders" element={ <OrderPage/> }/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/orders" element={ <OrderPage/> }/>
          <Route path="/admin" element={<Layout/>}>
              <Route index element={<Dashboard/>} />
              <Route path="/admin/orders" element={<Orders/>} />

              <Route path="/admin/products" element={<Product/>} />
              <Route path="/admin/products/add" element={<AddProduct />} />
              <Route path="/admin/products/edit/:id" element={<EditProduct/>} />

              <Route path="/admin/categories" element={<Category/>} />
              <Route path="/admin/categories/edit/:_id" element={<EditCategory/>} />
              <Route path="/admin/categories/add" element={<AddCategory/>} />
              
          </Route>
          
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
