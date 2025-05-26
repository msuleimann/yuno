import React from 'react';

interface SearchFormProps {
  onSearch: (searchData: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: {
      adults: number;
      children: number;
    };
  }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [location, setLocation] = React.useState('');
  const [checkIn, setCheckIn] = React.useState('');
  const [checkOut, setCheckOut] = React.useState('');
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location,
      checkIn,
      checkOut,
      guests: {
        adults,
        children
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto -mt-16 relative z-10">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">الوجهة</label>
          <input
            type="text"
            id="location"
            placeholder="إلى أين تريد الذهاب؟"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1ABED0] focus:border-[#1ABED0] text-right"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        
        <div className="flex-1">
          <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">تاريخ الوصول</label>
          <input
            type="date"
            id="check-in"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1ABED0] focus:border-[#1ABED0] text-right"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>
        
        <div className="flex-1">
          <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">تاريخ المغادرة</label>
          <input
            type="date"
            id="check-out"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1ABED0] focus:border-[#1ABED0] text-right"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>
        
        <div className="flex-1">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">الضيوف</label>
          <div className="flex items-center border border-gray-300 rounded-md p-3">
            <div className="mr-4">
              <label htmlFor="adults" className="text-sm text-gray-600">بالغين</label>
              <div className="flex items-center">
                <button 
                  type="button" 
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                >-</button>
                <span className="mx-2">{adults}</span>
                <button 
                  type="button" 
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                  onClick={() => setAdults(adults + 1)}
                >+</button>
              </div>
            </div>
            <div>
              <label htmlFor="children" className="text-sm text-gray-600">أطفال</label>
              <div className="flex items-center">
                <button 
                  type="button" 
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                >-</button>
                <span className="mx-2">{children}</span>
                <button 
                  type="button" 
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                  onClick={() => setChildren(children + 1)}
                >+</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-end">
          <button 
            type="submit" 
            className="w-full md:w-auto bg-[#FF8A00] text-white py-3 px-6 rounded-md hover:bg-[#e67e00] transition-colors font-medium"
          >
            بحث
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
