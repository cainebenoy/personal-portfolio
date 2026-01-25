import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json();

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString();

    // Send email to portfolio owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: "New Hire Inquiry from Your Portfolio",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">🎉 New Hire Inquiry</h2>
          <p>Someone is interested in working with you!</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Applied At:</strong> ${timestamp}</p>
          </div>
          <p style="color: #666; font-size: 14px;">Reply directly or contact them above.</p>
        </div>
      `,
    });

    // Send confirmation email to applicant
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Application Received - Let''s Build Something Amazing",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thanks for Your Interest, ${name}!</h2>
          <p>We''ve received your details. Caine will get back to you soon!</p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">— Caine Benoy</p>
        </div>
      `,
    });

    console.log("New hire inquiry:", { name, email, phone, timestamp });

    return NextResponse.json(
      { 
        success: true, 
        message: "Thanks for your interest! I''ll be in touch soon.",
        data: { name, email, phone }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing hire inquiry:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}
