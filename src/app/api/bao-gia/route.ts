import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const SERVICE_LABELS: Record<string, string> = {
  'cat-tia': 'Cắt tỉa cây xanh',
  'cham-soc': 'Chăm sóc cây xanh',
  'trong-cay': 'Trồng cây cảnh quan',
  'thiet-ke': 'Thiết kế sân vườn',
  'khac': 'Dịch vụ khác',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, area, address, message } = body;

    if (!name?.trim() || !phone?.trim() || !service?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const serviceLabel = SERVICE_LABELS[service] ?? service;
    const submittedAt = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    const htmlContent = `
<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;background:#f4f4f4;margin:0;padding:20px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
    <div style="background:linear-gradient(135deg,#16a34a,#15803d);padding:28px 32px">
      <h1 style="color:#fff;margin:0;font-size:22px">🌿 Yêu cầu báo giá mới</h1>
      <p style="color:#bbf7d0;margin:6px 0 0;font-size:14px">Nhận lúc: ${submittedAt}</p>
    </div>
    <div style="padding:28px 32px">
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:10px 0;color:#6b7280;font-size:14px;width:140px;vertical-align:top">Họ và tên</td>
          <td style="padding:10px 0;color:#111827;font-weight:600;font-size:14px">${name}</td>
        </tr>
        <tr style="border-top:1px solid #f3f4f6">
          <td style="padding:10px 0;color:#6b7280;font-size:14px;vertical-align:top">Số điện thoại</td>
          <td style="padding:10px 0;color:#111827;font-weight:600;font-size:14px">
            <a href="tel:${phone}" style="color:#16a34a;text-decoration:none">${phone}</a>
          </td>
        </tr>
        ${email ? `
        <tr style="border-top:1px solid #f3f4f6">
          <td style="padding:10px 0;color:#6b7280;font-size:14px;vertical-align:top">Email</td>
          <td style="padding:10px 0;color:#111827;font-size:14px">
            <a href="mailto:${email}" style="color:#16a34a;text-decoration:none">${email}</a>
          </td>
        </tr>` : ''}
        <tr style="border-top:1px solid #f3f4f6">
          <td style="padding:10px 0;color:#6b7280;font-size:14px;vertical-align:top">Dịch vụ</td>
          <td style="padding:10px 0;font-size:14px">
            <span style="background:#dcfce7;color:#15803d;padding:3px 10px;border-radius:20px;font-weight:600;font-size:13px">${serviceLabel}</span>
          </td>
        </tr>
        ${area ? `
        <tr style="border-top:1px solid #f3f4f6">
          <td style="padding:10px 0;color:#6b7280;font-size:14px;vertical-align:top">Diện tích</td>
          <td style="padding:10px 0;color:#111827;font-size:14px">${area}</td>
        </tr>` : ''}
        ${address ? `
        <tr style="border-top:1px solid #f3f4f6">
          <td style="padding:10px 0;color:#6b7280;font-size:14px;vertical-align:top">Địa chỉ</td>
          <td style="padding:10px 0;color:#111827;font-size:14px">${address}</td>
        </tr>` : ''}
        ${message ? `
        <tr style="border-top:1px solid #f3f4f6">
          <td style="padding:10px 0;color:#6b7280;font-size:14px;vertical-align:top">Mô tả</td>
          <td style="padding:10px 0;color:#111827;font-size:14px;white-space:pre-wrap">${message}</td>
        </tr>` : ''}
      </table>
    </div>
    <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb">
      <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center">
        Email tự động từ website <strong>dichvucayxanh.me</strong>
      </p>
    </div>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Dịch Vụ Cây Xanh" <${process.env.FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `[Báo Giá] ${name} - ${serviceLabel} - ${phone}`,
      html: htmlContent,
      replyTo: email || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Không gửi được email, vui lòng thử lại.' },
      { status: 500 }
    );
  }
}
