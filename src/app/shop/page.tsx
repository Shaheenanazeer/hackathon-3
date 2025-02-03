'use client';

import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import ProductListing from '../components/ProductListing';
import SearchAndFilter from '../components/SearchAndFilter';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '../components/pagination';

// Define Product interface


const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Change this value to adjust the number of products per page

  // Fetch products from Sanity on mount
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"]{
        category,
        "id": _id,
        price,
        description,
        stockLevel,
        imagePath,
        discountPercentage,
        isFeaturedProduct,
        name,
        "image":image.asset._ref
      }`;

      try {
        const products = await client.fetch(query);
        setProducts(products);
        setFilteredProducts(products); // Initialize filtered products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle filtering
  const handleFilter = (filtered: Product[]) => {
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  // Calculate paginated products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
      {/* Banner Section */}
      <div className="relative text-black">
        <Image
          src="/shop.jpeg" // Replace with the correct image file path
          alt="Shop Banner"
          height={400}
          width={1600}
          className="w-full h-40 md:h-auto object-cover"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl md:text-5xl font-semibold">
          Shop
        </h1>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-14">
          <p className="text-gray-700 text-xs md:text-xl flex items-center">
            <Link href="/" className="font-bold hover:underline">
              Home
            </Link>
            <span className="font-bold mx-2">{'>'}</span>
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <SearchAndFilter products={products} onFilter={handleFilter} />

      {/* Product Listing Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentProducts.map(product => (
          <ProductListing product={product} key={product.id} />
        ))}
      </div>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Shop;