
// AddToCartButton.tsx
"use client";

import { FaCartPlus } from 'react-icons/fa';

const AddToCartButton = () => {
  const handleAddToCart = () => {
    console.log('Add to Cart clicked');
    // Handle Add to Cart logic here
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105"
    >
      <FaCartPlus className="inline-block mr-2" />
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
