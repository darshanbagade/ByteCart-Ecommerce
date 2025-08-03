/// import PropTypes from 'prop-types';

import { Link, Links } from "react-router-dom";

export const ProductCard = ({ product }) => {
  return (
   <Link to={`/${product.slug}`}>
       <div className="border-2 w-44.5 lg:w-64 rounded-2xl bg-white transition-transform transform hover:-translate-y-2">
      <img
        src={product.image || 'https://via.placeholder.com/200'}
        alt={product.name}
        className="w-full lg:h-48 md:h-48 h-38 object-cover lg:mb-4 md:mb-4 rounded-t-2xl"
      />
      <div className=" px-4 mt-2 md:p-4 lg:p-4 ">
        <h3 className="text-lg  md:font-semibold lg:font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.category}</p>
        <p className="lg:text-xl pb-4 md:text-xl text-sm font-bold text-black mt-2">${product.price}</p>
      </div>
    </div>
   </Link>
  );
};

// ProductCard.propTypes = {
//   product: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     category: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     image: PropTypes.string,
//   }).isRequired,
// };