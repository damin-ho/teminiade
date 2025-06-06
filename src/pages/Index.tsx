
import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import ProductModal from '@/components/ProductModal';
import { Product } from '@/types/Product';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('fashionProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Add sample products with multiple images for demonstration
      const sampleProducts: Product[] = [
        {
          id: '1',
          name: 'Elegant Evening Dress',
          price: 299,
          description: 'A stunning black evening dress perfect for special occasions. Made with premium silk fabric and featuring elegant draping. This timeless piece combines sophistication with comfort, making it ideal for formal events, dinner parties, or any special celebration where you want to make a lasting impression.',
          images: [
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1566479179817-0e2f24d2a2b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          ],
          available: true
        },
        {
          id: '2',
          name: 'Summer Floral Midi',
          price: 189,
          description: 'Light and airy floral midi dress perfect for summer days. Features a flattering A-line silhouette and comfortable cotton blend. The beautiful floral print adds a touch of femininity while the midi length makes it versatile for both casual outings and semi-formal occasions.',
          images: [
            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1583396095519-b6c1a3b8b784?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1585487002537-16ab6f34e9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          ],
          available: true
        },
        {
          id: '3',
          name: 'Classic Little Black Dress',
          price: 245,
          description: 'Timeless little black dress that works for any occasion. Sleek design with modern cut and premium materials. This versatile piece can be dressed up with heels and jewelry for evening events or paired with a blazer for professional settings. A must-have staple for every wardrobe.',
          images: [
            'https://images.unsplash.com/photo-1566479179817-0e2f24d2a2b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          ],
          available: true
        },
        {
          id: '4',
          name: 'Bohemian Maxi Dress',
          price: 325,
          description: 'Free-spirited bohemian maxi dress with intricate patterns and flowing silhouette. Perfect for beach vacations, music festivals, or casual summer gatherings. The lightweight fabric moves beautifully with every step, while the unique print makes a bold fashion statement.',
          images: [
            'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1585487002537-16ab6f34e9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          ],
          available: true
        },
        {
          id: '5',
          name: 'Sophisticated Wrap Dress',
          price: 275,
          description: 'Elegant wrap dress that flatters all body types with its adjustable tie waist and flowing sleeves. Made from luxurious crepe fabric that drapes beautifully. Perfect for office wear, dinner dates, or any occasion where you want to look polished and put-together.',
          images: [
            'https://images.unsplash.com/photo-1583396095519-b6c1a3b8b784?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          ],
          available: true
        }
      ];
      setProducts(sampleProducts);
      localStorage.setItem('fashionProducts', JSON.stringify(sampleProducts));
    }
  }, []);

  const availableProducts = products.filter(p => p.available);

  return (
  
    <>
    
    {/* Product Detail Modal */}
     {selectedProduct ? 
       <ProductModal
         product={selectedProduct}
         onClose={() => setSelectedProduct(null)}
       />
     :
   <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
     {/* Header */}
     <header className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-40">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex items-center justify-center h-16">
           <div className="flex items-center space-x-2">
             <ShoppingBag className="h-8 w-8 text-rose-600" />
             <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
               Teminiade
             </h1>
           </div>
         </div>
       </div>
     </header>

     {/* Hero Section */}
     <section className="py-20 text-center">
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
         <h2 className="text-5xl font-bold text-gray-900 mb-6">
           Discover Your Perfect
           <span className="block bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
             Fashion Style
           </span>
         </h2>
         <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
           Curated collection of elegant dresses designed for the modern woman. 
           Each piece tells a story of sophistication and style.
         </p>
       </div>
     </section>

     {/* Products Grid */}
     <section className="pb-20">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
           Our Collection
         </h3>
         
         {availableProducts.length === 0 ? (
           <div className="text-center py-20">
             <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
             <p className="text-xl text-gray-500">No products available at the moment</p>
           </div>
         ) : (
           <ProductGrid
             products={availableProducts}
             onProductClick={setSelectedProduct}
             isAdminMode={false}
             onEditProduct={() => {}}
             onDeleteProduct={() => {}}
           />
         )}
       </div>
     </section>

     </div>
   }
    </>
  );
};

export default Index;
