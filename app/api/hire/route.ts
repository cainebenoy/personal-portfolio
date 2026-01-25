import { NextRequest, NextResponse } from "next/server";

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

    // For now, log to console and return success
    // In production, you might want to:
    // 1. Send an email notification
    // 2. Save to a database
    // 3. Integrate with a CRM
    // 4. Send to a Slack channel

    console.log("New hire inquiry:", { name, email, phone, timestamp: new Date() });

    // Example: Send email notification (you'd need to set up nodemailer or similar)
    // await sendEmailNotification(name, email, phone);

    return NextResponse.json(
      { 
        success: true, 
        message: "Thanks for your interest! I'll be in touch soon.",
        data: { name, email, phone }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing hire inquiry:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
