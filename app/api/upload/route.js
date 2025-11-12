import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic'; // ensures API route runs dynamically

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get('Name');
    const email = formData.get('Email');
    const message = formData.get('Message');
    const price = formData.get('Price');
    const files = formData.getAll('Images');

    // Configure email transport
    const transporter = nodemailer.createTransport({
      service: 'Outlook',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare attachments (if any)
    const attachments = files.map((file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    }));

    // Email body
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `🎨 New PaletteX Art Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
Price Offer: ${price}
      `,
      attachments,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Submission sent successfully!' });
  } catch (error) {
    console.error('Error in upload API:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}