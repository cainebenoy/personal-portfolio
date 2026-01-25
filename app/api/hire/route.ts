import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// This route needs Node.js (not the Edge runtime) because nodemailer relies on Node APIs
export const runtime = "nodejs";

// Create a transporter using Gmail with TLS (port 587)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use TLS instead of SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json();

    // Ensure required environment variables are present
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("EMAIL_USER or EMAIL_PASSWORD is missing. Check your .env.local settings.");
      return NextResponse.json(
        { error: "Email service is not configured on the server." },
        { status: 500 }
      );
    }

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

    // Send confirmation email to applicant with enriched details
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Application Received - Let's Build Something Amazing",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9;">
          <!-- Header with Profile -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center;">
            <img src="https://personal-portfolio-amber-eta.vercel.app/me.jpg" alt="Caine Benoy" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid white; margin-bottom: 20px; object-fit: cover;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Thanks for Your Interest!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">We'll be in touch shortly</p>
          </div>

          <!-- Main Content -->
          <div style="padding: 40px 30px; background: white; color: #333;">
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi <strong>${name}</strong>,</p>
            
            <p style="font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">Thank you for reaching out! Your application has been received and I'm excited to learn more about what you're looking to build. I'll review your details and get back to you within 24-48 hours.</p>

            <!-- Connect Section -->
            <div style="margin: 30px 0; padding: 0;">
              <p style="font-size: 15px; font-weight: 600; margin: 0 0 15px 0; color: #333;">Let's Connect</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                <a href="https://www.linkedin.com/in/caine-benoy-8061a9288/" style="display: inline-block; padding: 12px 20px; background: #0a66c2; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500; transition: background 0.3s;">LinkedIn</a>
                <a href="https://github.com/cainebenoy" style="display: inline-block; padding: 12px 20px; background: #333; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500; transition: background 0.3s;">GitHub</a>
                <a href="https://personal-portfolio-amber-eta.vercel.app/" style="display: inline-block; padding: 12px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500; transition: background 0.3s;">Portfolio</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="border-top: 2px solid #f0f0f0; margin-top: 40px; padding-top: 20px; text-align: center;">
              <p style="font-size: 14px; color: #999; margin: 0;">Looking forward to collaborating with you!</p>
              <p style="font-size: 16px; font-weight: 600; color: #333; margin: 12px 0 0 0;">— Caine Benoy</p>
            </div>
          </div>
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
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Details:", errorMsg);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}
