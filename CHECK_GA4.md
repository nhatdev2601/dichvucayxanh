# Kiểm tra GA4 Events có gửi đi không

## Bước 1: Kiểm tra Network Tab

1. Mở DevTools (F12) → Tab **Network**
2. Filter: Gõ `collect` hoặc `google-analytics`
3. Click vào số điện thoại trên web
4. **Xem có request nào đến `google-analytics.com/g/collect` không?**

### ✅ Nếu THẤY request → GA4 đang hoạt động, chờ 1-2 phút rồi refresh GA4
### ❌ Nếu KHÔNG thấy → Bị chặn bởi:
- Adblock / uBlock Origin
- Brave Browser shields
- Privacy Badger
- Extensions chặn tracking

## Bước 2: Test với DebugView (chính xác hơn Realtime)

1. Vào GA4: https://analytics.google.com/
2. Menu bên trái → **Configure** (Cấu hình)
3. Click **DebugView**
4. Mở một tab mới RIÊNG (Incognito hoặc Private) → vào web của bạn
5. Click số điện thoại
6. Quay lại DebugView → Xem có event `contact_click` không

## Bước 3: Tắt tất cả Extension

1. Mở **Incognito / Private window**
2. Vào: https://dichvucayxanh.me
3. Click số điện thoại
4. Check GA4 Realtime

## Bước 4: Manual Test trong Console

Paste đoạn này vào Console:

```javascript
// Check xem request có đi không
window.gtag('event', 'test_event_manual', {
  test_param: 'hello_from_console',
  page_location: window.location.pathname
});

// Đợi 2 giây rồi check Network tab
setTimeout(() => {
  console.log('Check Network tab - có request đến google-analytics.com/g/collect không?');
}, 2000);
```

Sau đó check **Network tab** → Filter `collect`

---

## Nếu vẫn không thấy trong GA4:

### Thử đổi sang Measurement Protocol (gửi từ server):
- Events từ client có thể bị chặn
- Measurement Protocol gửi từ backend → không bị block
