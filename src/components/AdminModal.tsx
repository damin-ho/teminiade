import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Product } from '@/types/Product';
import ImageUploader from './ImageUploader';
import { createProduct, updateProduct, deleteProduct } from '@/lib/supabaseFunctions'

// interface AdminModalProps {
//   products?: Product | null;
//   onClose: () => void;
//   onSave: (product: Product | Omit<Product, 'id'>) => void;
// }

type SavePayload = {
  e: React.FormEvent;
  product: Product | Omit<Product, 'id'>;
};

const AdminModal = ({ onClose, onSave }) => {

  // const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  // const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product>({
  id: uuidv4(),
  name: '',
  price: null,
  description: '',
  images: [],
  available: true,
});
 

const handleSave = async ({ e, product }: SavePayload) => {
   e.preventDefault();
  try {
    if ('id' in product) {
      await updateProduct(product as Product)
    } else {
      await createProduct(product)
    }
    // fetchAllProducts() // optional: refetch products
    // setShowModal(false)
  } catch (err) {
    console.error('Error saving product:', err)
  }
}

const handleDelete = async (id: string) => {
  try {
    await deleteProduct(id)
    // fetchAllProducts()
  } catch (err) {
    console.error('Delete failed:', err)
  }
}

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {products[0] ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form className="space-y-6" key={products.id}>
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={products.name || ""}
                onChange={(e) => {
                  setProducts({
                    ...products,
                    name: e.target.value,
                  });
                }}

                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={products?.price ?? ""}
                onChange={(e) => {
                  setProducts({
                    ...products,
                    price: parseFloat(e.target.value) || 0,
                  });
                }}

                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={products?.description || ""}
                onChange={(e) => {
                  setProducts({
                    ...products,
                    description: e.target.value,
                  });
                }}

                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                placeholder="Enter product description"
                required
              />
            </div>

            {/* Image Uploader */}
            <ImageUploader
              images={products?.images || []}
              onImagesChange={(newImages) => {
                setProducts({
                  ...products,
                  images: newImages,
                });
              }}
            />

            {/* Availability */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={products?.available || false}
                onChange={(e) => {
                  setProducts({
                    ...products,
                    available: e.target.checked,
                  });
                }}

                className="w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
              />
              <label htmlFor="available" className="text-sm font-semibold text-gray-700">
                Product is available for sale
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={(e) => handleSave({ e, product: products })}
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Save className="h-5 w-5" />
              <span>Add Product</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
