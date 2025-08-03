// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="container mx-auto bg-white border-2 rounded-2xl my-6 text-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-900">
              Your trusted electronics store, offering the latest in Mobile, Laptops, Headphones, Mouses, and Accessories.
            </p>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="text-sm text-gray-900 space-y-2">
              <li>
                <Link to="/category/mobiles" className="hover:underline underline-offset-2 transition">
                  Mobiles
                </Link>
              </li>
              <li>
                <Link to="/category/laptops" className="hover:underline underline-offset-2 transition">
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/category/headphones" className="hover:underline underline-offset-2 transition">
                  Headphones
                </Link>
              </li>
              <li>
                <Link to="/category/mouses" className="hover:underline underline-offset-2 transition">
                  Mouses
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="hover:underline underline-offset-2 transition">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="text-sm text-gray-9300 space-y-2">
              <li>
                <Link to="/faqs" className="hover:underline underline-offset-2 transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:underline underline-offset-2 transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:underline underline-offset-2 transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline underline-offset-2 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm text-gray-800">Email: support@bytecart.com</p>
            <p className="text-sm text-gray-800">Phone: +1 (800) 123-4567</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" className="text-gray-500 hover:text-black transition">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-500 hover:text-black transition">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-500 hover:text-black transition">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-500 hover:text-black transition">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm text-gray-600">
            Copyright© 2025 BYTECART. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;