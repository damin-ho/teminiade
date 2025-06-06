
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Product } from '@/types/Product';

interface WhatsAppButtonProps {
  product: Product;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ product }) => {
  const handleWhatsAppClick = () => {
    // You can replace this phone number with your sister's actual WhatsApp number
    const phoneNumber = '16134025965'; // Replace with actual number
    const message = `Hi! I'm interested in the ${product.name} listed for $${product.price}. Could you please share more details about it? Thank you!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="text-lg">Chat on WhatsApp</span>
    </button>
  );
};

export default WhatsAppButton;
