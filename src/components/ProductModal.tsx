
import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/Product';
import WhatsAppButton from './WhatsAppButton';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Safety check for images
  const images = product.images || [];
  const hasImages = images.length > 0;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const nextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (

      <div className="bg-white w-full h-70 shadow-2xl p-3">
         {/* Close Button */}
            <button
              onClick={onClose}
              className="self-end mb-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image Section with Carousel */}
          <div className="lg:w-1/2 relative">
            <div className="lg:aspect-auto lg:h-[65vh] relative flex justify-center items-center">
              <img
                src={hasImages ? images[currentImageIndex] : 'https://images.unsplash.com/photo-1566479179817-0e2f24d2a2b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                alt={`${product.name} ${currentImageIndex + 1}`}
                className="w-100 h-100 object-contain"
              />
              
              {/* Navigation arrows */}
              {images.length > 1 && (
                <div className="w-full flex items-center justify-between absolute">
                  <button
                    onClick={prevImage}
                    className=" left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className=" right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-700" />
                  </button>
                </div>
              )}
              
              {/* Image indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="p-4 bg-gray-50">
                <div className="flex space-x-2 overflow-x-auto ">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-rose-500'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 px-8 flex flex-col border-4 border-blue-800">
          

            {/* Product Details */}
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h2>
                
                <div className="text-4xl font-bold text-rose-600 mb-6">
                  ${product.price}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {product.description}
                </p>
              </div>

              {/* Product Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Features
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-rose-400 rounded-full mr-3"></span>
                    Premium quality materials
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-rose-400 rounded-full mr-3"></span>
                    Expert craftsmanship
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-rose-400 rounded-full mr-3"></span>
                    Perfect fit guarantee
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-rose-400 rounded-full mr-3"></span>
                    Available in multiple sizes
                  </li>
                </ul>
              </div>

              {/* Size Guide */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Size Information
                </h3>
                <p className="text-gray-600 text-sm">
                  Please contact us via WhatsApp for detailed size measurements and fitting advice.
                </p>
                <p className="text-gray-600 text-sm font-semibold mt-2">
                  CLICK THE BUTTON BELOW!
                </p>
              </div>

            {/* WhatsApp Contact Button */}
            <div className="pt-6 border-t border-gray-200">
              <WhatsAppButton product={product} />
            </div>
            </div>

          </div>
        </div>
      </div>
  );
};

export default ProductModal;
