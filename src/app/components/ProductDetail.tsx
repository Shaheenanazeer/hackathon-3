'use client';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { BsFacebook } from 'react-icons/bs';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useState } from 'react';
import { useCart } from '../../../context/CartContext';

const ProductDetail = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: urlFor(product.image).url(),
      quantity,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fadeIn pb-9">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Image
            src={urlFor(product.image).url()}
            alt={product.name}
            height={1000}
            width={1000}
            className="rounded-lg object-cover"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col justify-between bg-white p-8 rounded-lg shadow-md space-y-6 animate-slideInRight">
        <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-3xl text-green-600 font-semibold">$ {product.price}</p>

        <p className="text-gray-600">
          <span className="font-medium">Stock Level: </span>
          {product.stockLevel > 0 ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>

        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        <div className="flex items-center space-x-4">
          <button onClick={decreaseQuantity} className="px-3 py-2 bg-gray-300 rounded-lg">-</button>
          <span className="text-xl font-bold">{quantity}</span>
          <button onClick={increaseQuantity} className="px-3 py-2 bg-gray-300 rounded-lg">+</button>
        </div>

        <div className="flex space-x-4">
          <button 
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105"
          >
            <FaCartPlus className="inline-block mr-2" />
            Add to Cart
          </button>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition transform hover:scale-105">
            <FaHeart className="inline-block mr-2" />
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;