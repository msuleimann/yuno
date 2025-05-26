import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';

// Sample property data
const featuredProperties = [
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
  }
];

const propertyTypes = [
  {
    type: 'غرف',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    count: 120
  },
  {
    type: 'شقق',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    count: 85
  },
  {
    type: 'فيلات',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    count: 45
  },
  {
    type: 'بيوت',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    count: 65
  }
];

const Home: React.FC = () => {
  const handleSearch = (searchData: any) => {
    console.log('Search data:', searchData);
    // In a real app, this would navigate to search results page with the search parameters
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="h-[500px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60)' }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">استمتع بالاسترخاء في بيت عطلات</h1>
            <p className="text-xl md:text-2xl mb-8 text-center">جميع أفراد العائلة، في مكان لكم فقط</p>
          </div>
        </div>
        
        {/* Search Form */}
        <SearchForm onSearch={handleSearch} />
      </div>
      
      {/* Property Types Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">ابحث حسب نوع مكان الإقامة</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img src={item.image} alt={item.type} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold">{item.type}</h3>
                  <p className="text-gray-600">{item.count} مكان إقامة</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Properties Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">أقم في أفضل أماكن الإقامة الفريدة لدينا</h2>
          <p className="text-center text-gray-600 mb-10">من الفلل والشقق إلى الغرف والبيوت، لدينا كل شيء</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <a 
              href="/properties" 
              className="inline-block bg-[#1ABED0] text-white px-6 py-3 rounded-md hover:bg-[#0e9cb0] transition-colors"
            >
              عرض جميع العقارات
            </a>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">لماذا تختار Yuno؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#1ABED0] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">حجز آمن</h3>
              <p className="text-gray-600">نظام حجز آمن وموثوق مع خيارات دفع متعددة</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#1ABED0] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">دعم على مدار الساعة</h3>
              <p className="text-gray-600">فريق دعم متاح 24/7 لمساعدتك في أي وقت</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#1ABED0] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">إلغاء مجاني</h3>
              <p className="text-gray-600">إلغاء مجاني على معظم الحجوزات لمرونة أكبر</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
