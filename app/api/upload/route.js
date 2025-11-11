import nodemailer from "nodemailer";
import formidable from "formidable";
import { promises as fs } from "fs";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req) {
  try {
    const form = formidable({ multiples: true });
    const [fields, files] = await form.parse(req);

    const name = fields.name?.[0] || "Unknown Artist";
    const email = fields.email?.[0] || "No email";
    const message = fields.message?.[0] || "No message";
    const price = fields.price?.[0] || "N/A";

    // Read image files (base64)
    const attachments = [];
    if (files.images) {
      const fileList = Array.isArray(files.images)
        ? files.images
        : [files.images];
      for (const file of fileList) {
        const fileContent = await fs.readFile(file.filepath);
        attachments.push({
          filename: file.originalFilename,
          content: fileContent,
        });
      }
    }

    // Setup transporter (Outlook)
    const transporter = nodemailer.createTransport({
      service: "Outlook",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"PaletteX Upload" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🎨 New Artwork Upload from ${name}`,
      html: `
        <h2>New PaletteX Artwork Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Price Offer:</b> ${price}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
      attachments,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
    });
  }
