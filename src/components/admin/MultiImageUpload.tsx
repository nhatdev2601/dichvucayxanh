'use client';

import { useState, useRef, useCallback } from 'react';
import { uploadImage, deleteImage } from '@/lib/upload';
import { getImageUrl } from '@/lib/utils';

interface MultiImageUploadProps {
  value: string[]; // array of file IDs
  onChange: (fileIds: string[]) => void;
  label?: string;
}

export default function MultiImageUpload({ value = [], onChange, label = 'Danh sách ảnh' }: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        setError('Vui lòng chọn file ảnh (JPG, PNG, WebP...)');
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('Kích thước ảnh tối đa 10MB');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setError('');
    setUploading(true);

    try {
      const newFileIds = await Promise.all(validFiles.map(file => uploadImage(file)));
      onChange([...value, ...newFileIds]);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Lỗi upload ảnh. Vui lòng thử lại.');
    } finally {
      setUploading(false);
    }
  }, [value, onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleUpload(e.target.files);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) handleUpload(e.dataTransfer.files);
  };

  const handleRemove = async (fileIdToRemove: string) => {
    if (!confirm('Bạn có chắc muốn xóa ảnh này?')) return;

    try {
      await deleteImage(fileIdToRemove);
      onChange(value.filter(id => id !== fileIdToRemove));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Previews */}
      {value.length > 0 && (
        <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {value.map((fileId) => (
            <div key={fileId} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
              <img
                src={getImageUrl(fileId)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleRemove(fileId)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="Xóa ảnh"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
          dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          {uploading ? (
            <>
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500">Đang tải ảnh lên...</p>
            </>
          ) : (
            <>
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-primary">Click để chọn nhiều ảnh</span> hoặc kéo thả vào đây
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, WebP (Tối đa 10MB/ảnh)</p>
            </>
          )}
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
