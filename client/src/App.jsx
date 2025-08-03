import { Routes , Route } from "react-router-dom";
import {Home, ProductDetails} from "./pages/index";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path="/:slug" element={ <ProductDetails/> }/>
      </Routes>
      
    </>
  )
}

export default App
