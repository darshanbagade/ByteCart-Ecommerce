import PropTypes from 'prop-types';

import { Link, Links } from "react-router-dom";

export const ProductCard = ({ product }) => {
  return (
   <Link to={`/${product.slug}`}>
       <div className="border-2 rounded-2xl bg-white transition-transform transform hover:-translate-y-2 w-full max-w-sm mx-auto">
      <img
        src={product.images[0] || 'https://via.placeholder.com/200'}
        alt={product.title}
        className="w-full h-32 sm:h-40 md:h-44 lg:h-48 object-cover rounded-t-[14px]"
      />
      <div className="p-2 sm:p-3 md:p-4">
        <h3 className="text-sm sm:text-base md:text-lg font-medium md:font-semibold text-gray-800 truncate">{product.title}</h3>
        <p className="text-xs sm:text-sm text-gray-600">{product.category.name}</p>
        <p className="text-sm sm:text-lg md:text-xl font-bold text-black mt-1 md:mt-2 pb-2 md:pb-4">${product.price}</p>
      </div>
    </div>
   </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
  }).isRequired,
};