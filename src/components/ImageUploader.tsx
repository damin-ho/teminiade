
import React, { useState, useRef } from 'react';
import { Upload, X, Plus, Link } from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, onImagesChange }) => {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addImageUrl = () => {
    if (newImageUrl.trim() && !images.includes(newImageUrl.trim())) {
      onImagesChange([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageDataUrl = e.target?.result as string;
            if (imageDataUrl && !images.includes(imageDataUrl)) {
              onImagesChange([...images, imageDataUrl]);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && uploadMode === 'url') {
      e.preventDefault();
      addImageUrl();
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Product Images
      </label>

      {/* Upload Mode Toggle */}
      <div className="flex space-x-2 mb-4">
        <button
          type="button"
          onClick={() => setUploadMode('url')}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
            uploadMode === 'url'
              ? 'bg-rose-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Link className="h-4 w-4" />
          <span>URL</span>
        </button>
        <button
          type="button"
          onClick={() => setUploadMode('file')}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
            uploadMode === 'file'
              ? 'bg-rose-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Upload className="h-4 w-4" />
          <span>Upload File</span>
        </button>
      </div>
      
      {/* URL Input Mode */}
      {uploadMode === 'url' && (
        <div className="flex space-x-2">
          <input
            type="url"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            placeholder="Enter image URL and press Enter"
          />
          <button
            type="button"
            onClick={addImageUrl}
            className="px-4 py-3 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* File Upload Mode */}
      {uploadMode === 'file' && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="w-full px-4 py-3 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Upload className="h-4 w-4" />
            <span>Choose Files from Computer</span>
          </label>
        </div>
      )}

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            {uploadMode === 'url' 
              ? 'Add product images using URLs above' 
              : 'Click "Choose Files" to upload images from your computer'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
