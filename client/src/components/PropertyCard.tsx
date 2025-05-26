import React from 'react';

interface PropertyCardProps {
  id: string;
  name: string;
  type: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  name,
  type,
  location,
  price,
  rating,
  image
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-[#1ABED0] text-white px-2 py-1 rounded text-sm">
          {type}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-right">{name}</h3>
        <p className="text-gray-600 mb-2 text-right">{location}</p>
        
        <div className="flex justify-between items-center mt-3">
          <div className="bg-[#FF8A00] text-white px-3 py-1 rounded-full text-sm">
            {price} ل.س / الليلة
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-700 mr-1">{rating}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        
        <a 
          href={`/properties/${id}`} 
          className="block text-center bg-[#1ABED0] text-white py-2 rounded mt-4 hover:bg-[#0e9cb0] transition-colors"
        >
          عرض التفاصيل
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;
