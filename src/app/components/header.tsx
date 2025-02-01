
'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { IoMdHeartEmpty } from 'react-icons/io';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'; // Import icons for menu toggle
import ShoppingCart from './Card';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
                {/* Logo */}
                <h1 className="text-xl font-bold text-gray-800">
                    <Link href="/">OnlineShopping</Link>
                </h1>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-2xl text-gray-700"
                    aria-label="Toggle Mobile Menu"
                >
                    {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                </button>

                {/* Navigation Links for Desktop */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-8 font-medium text-gray-700">
                        <li>
                            <Link href="/" aria-label="Navigate to Home" className="hover:text-blue-600">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop" aria-label="Navigate to Shop" className="hover:text-blue-600">
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" aria-label="Navigate to Blog" className="hover:text-blue-600">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" aria-label="Navigate to Contact" className="hover:text-blue-600">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-4 text-gray-700">
                    <Link href="/myaccount" aria-label="User Profile">
                        <FaRegUser size={20} className="hover:text-blue-600" />
                    </Link>
                    <FiSearch size={22} className="hover:text-blue-600" />
                    <IoMdHeartEmpty size={25} className="hover:text-blue-600" />
                    <ShoppingCart />
                </div>
            </div>

            {/* Mobile Menu (Visible when isMenuOpen is true) */}
            <nav
                className={`fixed top-0 left-0 w-full h-full bg-white z-40 transition-transform duration-300 ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-xl font-bold text-gray-800">Your Logo</h1>
                    <button
                        onClick={toggleMenu}
                        className="text-2xl text-gray-700"
                        aria-label="Close Mobile Menu"
                    >
                        <HiOutlineX />
                    </button>
                </div>
                <ul className="flex flex-col items-center space-y-6 py-8 font-medium text-gray-700">
                    <li>
                        <Link
                            href="/"
                            aria-label="Navigate to Home"
                            className="hover:text-blue-600"
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/shop"
                            aria-label="Navigate to Shop"
                            className="hover:text-blue-600"
                            onClick={toggleMenu}
                        >
                            Shop
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/blog"
                            aria-label="Navigate to Blog"
                            className="hover:text-blue-600"
                            onClick={toggleMenu}
                        >
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            aria-label="Navigate to Contact"
                            className="hover:text-blue-600"
                            onClick={toggleMenu}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
