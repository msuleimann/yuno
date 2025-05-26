import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';

// Sample property data
const allProperties = [
  {
    id: '1',
    name: 'شقة فاخرة في دمشق',
    type: 'شقة',
    location: 'دمشق، سوريا',
    price: 25000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    name: 'فيلا مع إطلالة على البحر',
    type: 'فيلا',
    location: 'اللاذقية، سوريا',
    price: 45000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    name: 'غرفة في فندق بوتيك',
    type: 'غرفة',
    location: 'حلب، سوريا',
    price: 18000,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '4',
    name: 'منزل ريفي تقليدي',
    type: 'بيت',
    location: 'حمص، سوريا',
    price: 30000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '5',
    name: 'شقة وسط المدينة',
    type: 'شقة',
    location: 'دمشق، سوريا',
    price: 22000,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '6',
    name: 'غرفة مزدوجة مطلة على الحديقة',
    type: 'غرفة',
    location: 'طرطوس، سوريا',
    price: 15000,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '7',
    name: 'فيلا فاخرة مع مسبح',
    type: 'فيلا',
    location: 'اللاذقية، سوريا',
    price: 60000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '8',
    name: 'بيت ريفي مع حديقة',
    type: 'بيت',
    location: 'حماة، سوريا',
    price: 28000,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  }
];

const PropertyListing: React.FC = () => {
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [selectedType, setSelectedType] = useState('الكل');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [searchQuery, setSearchQuery] = useState('');

  const propertyTypes = ['الكل', 'شقة', 'فيلا', 'غرفة', 'بيت'];

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    if (type === 'الكل') {
      setFilteredProperties(allProperties.filter(property => 
        property.price >= priceRange[0] && 
        property.price <= priceRange[1] &&
        (searchQuery === '' || property.name.includes(searchQuery) || property.location.includes(searchQuery))
      ));
    } else {
      setFilteredProperties(allProperties.filter(property => 
        property.type === type && 
        property.price >= priceRange[0] && 
        property.price <= priceRange[1] &&
        (searchQuery === '' || property.name.includes(searchQuery) || property.location.includes(searchQuery))
      ));
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
    
    if (selectedType === 'الكل') {
      setFilteredProperties(allProperties.filter(property => 
        property.price >= newPriceRange[0] && 
        property.price <= newPriceRange[1] &&
        (searchQuery === '' || property.name.includes(searchQuery) || property.location.includes(searchQuery))
      ));
    } else {
      setFilteredProperties(allProperties.filter(property => 
        property.type === selectedType && 
        property.price >= newPriceRange[0] && 
        property.price <= newPriceRange[1] &&
        (searchQuery === '' || property.name.includes(searchQuery) || property.location.includes(searchQuery))
      ));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (selectedType === 'الكل') {
      setFilteredProperties(allProperties.filter(property => 
        property.price >= priceRange[0] && 
        property.price <= priceRange[1] &&
        (query === '' || property.name.includes(query) || property.location.includes(query))
      ));
    } else {
      setFilteredProperties(allProperties.filter(property => 
        property.type === selectedType && 
        property.price >= priceRange[0] && 
        property.price <= priceRange[1] &&
        (query === '' || property.name.includes(query) || property.location.includes(query))
      ));
    }
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">استكشف أماكن الإقامة</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">البحث والتصفية</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">البحث</label>
              <input 
                type="text" 
                placeholder="ابحث عن اسم أو موقع" 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">نوع العقار</h3>
              <div className="space-y-2">
                {propertyTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input 
                      type="radio" 
                      id={type} 
                      name="propertyType" 
                      checked={selectedType === type}
                      onChange={() => handleTypeFilter(type)}
                      className="mr-2"
                    />
                    <label htmlFor={type}>{type}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">نطاق السعر</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">الحد الأدنى: {priceRange[0]} ل.س</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100000" 
                    step="5000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">الحد الأقصى: {priceRange[1]} ل.س</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100000" 
                    step="5000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Listings */}
          <div className="w-full md:w-3/4">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">{filteredProperties.length} نتيجة</p>
              <select className="p-2 border border-gray-300 rounded-md">
                <option>الترتيب حسب: الأحدث</option>
                <option>الترتيب حسب: السعر (الأقل إلى الأعلى)</option>
                <option>الترتيب حسب: السعر (الأعلى إلى الأقل)</option>
                <option>الترتيب حسب: التقييم</option>
              </select>
            </div>
            
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-xl text-gray-600">لا توجد نتائج تطابق معايير البحث</p>
                <button 
                  onClick={() => {
                    setSelectedType('الكل');
                    setPriceRange([0, 100000]);
                    setSearchQuery('');
                    setFilteredProperties(allProperties);
                  }}
                  className="mt-4 bg-[#1ABED0] text-white px-4 py-2 rounded-md hover:bg-[#0e9cb0] transition-colors"
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default PropertyListing;
