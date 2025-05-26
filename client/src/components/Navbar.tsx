import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#1ABED0] text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">Yuno</Link>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200 transition-colors">الرئيسية</Link>
          <Link to="/properties" className="hover:text-gray-200 transition-colors">العقارات</Link>
          <Link to="/about" className="hover:text-gray-200 transition-colors">من نحن</Link>
          <Link to="/contact" className="hover:text-gray-200 transition-colors">اتصل بنا</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/login" className="px-4 py-2 rounded hover:bg-[#0e9cb0] transition-colors">تسجيل الدخول</Link>
          <Link to="/register" className="bg-[#FF8A00] px-4 py-2 rounded hover:bg-[#e67e00] transition-colors">إنشاء حساب</Link>
          
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
