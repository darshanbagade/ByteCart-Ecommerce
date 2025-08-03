// CategoryMenu.jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const CategoryMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile dropdown toggle

  const categories = [
    { name: 'Mobile', path: '/category/mobile' },
    { name: 'Laptops', path: '/category/laptops' },
    { name: 'Headphones', path: '/category/headphones' },
    { name: 'Mouses', path: '/category/mouses' },
    { name: 'Accessories', path: '/category/accessories' },
  ];

  return (
    <div className="relative flex justify-center ">
      <ul
        className={`flex flex-wrap justify-center gap-4 lg:flex lg:space-x-4 bg-white  rounded-md p-4 mt-2 lg:mt-0`}
      >
        {categories.map((category, index) => (
          <li key={index}>
            <NavLink
              to={category.path}
              className={({ isActive }) =>
                [
                  'block text-black transition border-1 p-4 rounded-2xl',
                  isActive
                    ? 'bg-blue-500 text-white font-semibold'
                    : 'hover:bg-gray-100 hover:text-gray-900',
                ].join(' ')
              }
              onClick={() => setIsOpen(false)} // Close menu on click for mobile
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};