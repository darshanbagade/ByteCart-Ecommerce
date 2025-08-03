import { Routes , Route, BrowserRouter } from "react-router-dom";
import {Home, ProductPage} from "./pages/index";
import {ScrollToTop} from './utils/ScrollToTop'
function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path="/:slug" element={ <ProductPage/> }/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
