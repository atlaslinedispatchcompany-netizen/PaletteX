import { NextResponse } from 'next/server';
import formidable from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs';

export const dynamic = 'force-dynamic'; // ✅ required for API routes in Next 13+

export async function POST(request) {
  try {
    const form = formidable({ multiples: true });
    const data = await new Promise((resolve, reject) => {
      form.parse(request.nextUrl ? request.body : request, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    // Email setup
    const transporter = nodemailer.createTransport({
      service: 'Outlook',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const { Name, Email, Message, Price } = data.fields;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New PaletteX Art Submission from ${Name}`,
      text: `
Name: ${Name}
Email: ${Email}
Message: ${Message}
Price Offer: ${Price}
      `,
      attachments: Object.values(data.files).flat().map((file) => ({
        filename: file.originalFilename,
        path: file.filepath,
      })),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Upload sent successfully!' });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}