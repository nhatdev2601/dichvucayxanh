# Hướng dẫn thêm hình ảnh

## Cách 1: Sử dụng thư mục public/images (Đơn giản)

1. Copy file ảnh vào thư mục `public/images/`
2. Đặt tên file trùng với field `images` trong database
   - Ví dụ: `kimtien1.jpg`, `luoiho1.jpg`

## Cách 2: Upload lên Appwrite Storage (Khuyến nghị)

1. Sử dụng component `ImageUpload` trong admin panel
2. Upload ảnh sẽ tự động lưu vào Appwrite Storage
3. Trả về imageId để lưu vào database

## Format ảnh được support:
- JPG, PNG, GIF, WEBP
- Kích thước tối đa: 5MB
- Kích thước khuyến nghị: 500x500px

## Ví dụ tên file:
- kimtien1.jpg
- luoiho1.jpg  
- bachma1.jpg
- xoai1.jpg

## Cập nhật database:
Sau khi có ảnh, cập nhật field `images` trong plants collection với tên file hoặc imageId.
