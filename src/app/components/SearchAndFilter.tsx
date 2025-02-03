import React, { useState } from 'react';

interface SearchAndFilterProps {
  products: Product[];
  onFilter: (filteredProducts: Product[]) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ products, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  const categories = Array.from(new Set(products.map(product => product.category)));

  const handleFilter = () => {
    let filteredProducts = products;

    // Filter by search query
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange) {
      filteredProducts = filteredProducts.filter(
        product => product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }

    onFilter(filteredProducts);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md flex-1"
        />

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Price Range Filter */}
        <select
          onChange={e => {
            const [min, max] = e.target.value.split('-').map(Number);
            setPriceRange(min !== undefined && max !== undefined ? [min, max] : null);
          }}
          className="p-2 border rounded-md"
        >
          <option value="">All Prices</option>
          <option value="0-50">$0 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value="200-500">$200 - $500</option>
          <option value="500-1000">$500 - $1000</option>
        </select>

        {/* Filter Button */}
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;