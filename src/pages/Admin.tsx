
import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductGrid from '@/components/ProductGrid';
import AdminModal from '@/components/AdminModal';
import { Product } from '@/types/Product';

const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('fashionProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('fashionProducts', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
    setIsAdminModalOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    setEditingProduct(null);
    setIsAdminModalOpen(false);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-rose-600 hover:text-rose-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Store</span>
            </button>
            
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Teminiade Admin
            </h1>
            
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Admin Controls */}
      <div className="bg-rose-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Edit3 className="h-5 w-5" />
              <span className="font-medium">Admin Mode - Manage your products</span>
            </div>
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsAdminModalOpen(true);
              }}
              className="flex items-center space-x-2 bg-white text-rose-600 px-4 py-2 rounded-full font-medium hover:bg-rose-50 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Management */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Manage Products ({products.length})
          </h2>
          
          <ProductGrid
            products={products}
            onProductClick={() => {}} // No action needed in admin
            isAdminMode={true}
            onEditProduct={(product) => {
              setEditingProduct(product);
              setIsAdminModalOpen(true);
            }}
            onDeleteProduct={handleDeleteProduct}
          />
        </div>
      </section>

      {/* Admin Modal */}
      {isAdminModalOpen && (
        <AdminModal
          product={editingProduct}
          onClose={() => {
            setIsAdminModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={editingProduct ? handleEditProduct : handleAddProduct}
        />
      )}
    </div>
  );
};

export default Admin;
