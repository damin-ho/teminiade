
import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { Product } from '@/types/Product';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  isAdminMode: boolean;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onProductClick,
  isAdminMode,
  onEditProduct,
  onDeleteProduct
}) => {
  const handleProductClick = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    if (!isAdminMode) {
      onProductClick(product);
    }
  };

  const handleEdit = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onEditProduct(product);
  };

  const handleDelete = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this product?')) {
      onDeleteProduct(productId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className={`group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
            isAdminMode ? 'cursor-default' : 'cursor-pointer'
          }`}
          onClick={(e) => handleProductClick(e, product)}
        >
          {/* Admin Controls */}
          {isAdminMode && (
            <div className="absolute top-4 right-4 z-20 flex space-x-2">
              <button
                onClick={(e) => handleEdit(e, product)}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
              >
                <Edit3 className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => handleDelete(e, product.id)}
                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Product Image */}
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1566479179817-0e2f24d2a2b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-rose-600">
                ${product.price}
              </span>
              {!isAdminMode && (
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Click for details
                </span>
              )}
            </div>
          </div>

          {/* Hover Overlay */}
          {!isAdminMode && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
