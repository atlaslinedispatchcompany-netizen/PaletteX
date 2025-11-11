import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send({ message: "Only POST requests allowed" });

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Outlook",
    auth: {
      user: process.env.officialpalettex@outlook.com,
      pass: process.env.nndwgoxkjrhpdfks,
    },
  });

  try {
    await transporter.sendMail({
      from: `"PaletteX" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: `Email