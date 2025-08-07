import React from 'react'
import { Footer, Navbar, ProductDetails, ProductList } from '../components/index';
import { Iphone_01, Iphone_02, Iphone_03, Iphone_04} from '../assets';
import { useParams } from 'react-router-dom';

const ProductPage = () => {

    const {slug} = useParams(); 
    const product = {
    _id: '1',
    title: 'Iphone 14 Pro',
    slug: 'iphone-15-pro',
    description:
      'The iPhone 14 Pro features a 6.1-inch Super Retina XDR display, A16 Bionic chip, and advanced triple-camera system.',
    price: 200000,
    images: [Iphone_01, Iphone_02, Iphone_03, Iphone_04], 
    stock: 10,
    brand: 'Apple',
    features: ['A16 Bionic Chip', 'Triple Camera System', 'Super Retina XDR Display', '5G Support'],
    category: 'Mobile',
    ratingAvg: 4.5,
    reviews: [],
  };


  return (
    <div >
      <Navbar/>
      <ProductDetails product={product}/>
      <ProductList category={product.category} productRange={8}/>
      <Footer/>
    </div>
  )
}

export  {ProductPage};