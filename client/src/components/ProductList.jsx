import {useState, useEffect} from 'react';
import { Iphone_01, Iphone_02 } from '../assets/index';
import { getAllProducts } from '../services/productServices';
import { ProductCard } from '../components/index';
import {Loader} from '../components/index';

const ProductList = (
  {
    category = "Mobile",
    productRange = 4
  }) => {


  const [products, setProducts ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchProducts = async() => {
      setLoading(true);
      setError(null);
      try{
        const response = await getAllProducts();
        setProducts(response.data.data);
        console.log(response.data.data)
      } catch(err){
        setError("Failed to fetch te data");
      } finally{
        setLoading(false);
      }
    }
    fetchProducts();
  },[])




  
  return (
    <div className="my-10">
      {/* Mobiles Section */}
      <div className="my-4 text-xl font-semibold">{category}</div>
      <div>
        {loading && <Loader/>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {products
              .filter((product) => product.category.name === category)
              .slice(0, productRange)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        ) : (
          !loading && !error && <p className="text-gray-600 text-center">No products found.</p>
        )}
      </div>
    </div>


        
  );
};

export { ProductList };