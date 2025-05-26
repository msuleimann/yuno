import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Sample property data
const property = {
  id: '2',
  name: 'فيلا مع إطلالة على البحر',
  type: 'فيلا',
  location: 'اللاذقية، سوريا',
  price: 45000,
  rating: 4.9,
  description: 'فيلا فاخرة مع إطلالة رائعة على البحر، تتميز بتصميم عصري وديكور أنيق. تحتوي على 3 غرف نوم و2 حمام ومطبخ مجهز بالكامل وصالة واسعة مع شرفة كبيرة تطل على البحر. مثالية للعائلات والمجموعات الكبيرة.',
  amenities: ['واي فاي مجاني', 'مكيف هواء', 'مطبخ مجهز', 'تلفزيون', 'غسالة ملابس', 'موقف سيارات', 'مسبح خاص', 'شرفة'],
  images: [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1574739782594-db4ead022697?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtpdGNoZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJlZHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  ],
  features: {
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    maxGuests: 6
  },
  reviews: [
    {
      id: 1,
      user: 'أحمد محمد',
      rating: 5,
      date: '2023-08-15',
      comment: 'مكان رائع مع إطلالة خلابة على البحر. نظيف ومريح ومجهز بالكامل. سنعود بالتأكيد!'
    },
    {
      id: 2,
      user: 'سارة علي',
      rating: 4,
      date: '2023-07-22',
      comment: 'استمتعنا بإقامتنا في هذه الفيلا الجميلة. المسبح رائع والموقع مثالي. المطبخ مجهز جيداً.'
    },
    {
      id: 3,
      user: 'محمد خالد',
      rating: 5,
      date: '2023-06-10',
      comment: 'تجربة لا تُنسى! الفيلا أجمل مما تظهر في الصور، والمضيف كان متعاوناً جداً.'
    }
  ]
};

const PropertyDetails: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [totalPrice, setTotalPrice] = useState(property.price);
  const [nights, setNights] = useState(1);

  const handleDateChange = () => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setNights(diffDays);
      setTotalPrice(property.price * diffDays);
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم إرسال طلب الحجز بنجاح!');
    // In a real app, this would send the booking data to the backend
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="mr-1">{property.rating}</span>
            <span className="mx-2 text-gray-500">•</span>
            <span className="text-gray-600">{property.location}</span>
          </div>
        </div>
        
        {/* Property Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="h-96 overflow-hidden rounded-lg">
            <img 
              src={property.images[selectedImage]} 
              alt={property.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.images.map((image, index) => (
              <div 
                key={index} 
                className={`h-44 overflow-hidden rounded-lg cursor-pointer ${selectedImage === index ? 'ring-4 ring-[#1ABED0]' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${property.name} ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Property Details */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-start border-b pb-4 mb-4">
                <div>
                  <h2 className="text-2xl font-semibold">{property.type} كاملة</h2>
                  <p className="text-gray-600">
                    {property.features.maxGuests} ضيوف • {property.features.bedrooms} غرف نوم • {property.features.bathrooms} حمام • {property.features.area} متر مربع
                  </p>
                </div>
                <div className="bg-[#1ABED0] text-white px-3 py-1 rounded-full text-sm">
                  {property.price} ل.س / الليلة
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">الوصف</h3>
                <p className="text-gray-700">{property.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">المميزات</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1ABED0] ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Reviews */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">التقييمات</h3>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${star <= property.rating ? 'text-yellow-500' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="mr-2 text-lg font-semibold">{property.rating}</span>
                  <span className="text-gray-600">({property.reviews.length} تقييم)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {property.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex justify-between mb-2">
                      <div className="font-semibold">{review.user}</div>
                      <div className="text-gray-600">{review.date}</div>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-500' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Booking Form */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              <h3 className="text-xl font-semibold mb-4">احجز الآن</h3>
              
              <form onSubmit={handleBooking}>
                <div className="mb-4">
                  <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">تاريخ الوصول</label>
                  <input 
                    type="date" 
                    id="check-in" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1ABED0] focus:border-[#1ABED0]"
                    value={checkInDate}
                    onChange={(e) => {
                      setCheckInDate(e.target.value);
                      handleDateChange();
                    }}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">تاريخ المغادرة</label>
                  <input 
                    type="date" 
                    id="check-out" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1ABED0] focus:border-[#1ABED0]"
                    value={checkOutDate}
                    onChange={(e) => {
                      setCheckOutDate(e.target.value);
                      handleDateChange();
                    }}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">عدد الضيوف</label>
                  <select 
                    id="guests" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-[#1ABED0] focus:border-[#1ABED0]"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    required
                  >
                    {[...Array(property.features.maxGuests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} ضيف</option>
                    ))}
                  </select>
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span>{property.price} ل.س × {nights} ليلة</span>
                    <span>{property.price * nights} ل.س</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>رسوم الخدمة</span>
                    <span>{Math.round(property.price * nights * 0.1)} ل.س</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>المجموع</span>
                    <span>{Math.round(property.price * nights * 1.1)} ل.س</span>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-[#FF8A00] text-white py-3 rounded-md hover:bg-[#e67e00] transition-colors font-medium"
                >
                  احجز الآن
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default PropertyDetails;
