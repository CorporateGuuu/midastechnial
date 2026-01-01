// lib/sendTrackingNotification.ts
import { resend } from "./email";
import twilio from "twilio";

export async function sendTrackingNotification({
  email,
  phone,
  status,
  trackingNumber,
  trackingUrl,
}: {
  email: string;
  phone?: string;
  status: string;
  trackingNumber: string;
  trackingUrl: string;
}) {
  // Prevent execution during build time
  if (!process.env.VERCEL) return;

  // Create HTML email template
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Tracking Update</h2>
      <p style="font-size: 16px; line-height: 1.5;">
        Your package <strong>${trackingNumber}</strong> is now <strong>${status}</strong>.
      </p>
      <p style="font-size: 16px; line-height: 1.5;">
        <a href="${trackingUrl}" style="color: #007bff; text-decoration: none;">Track Package</a>
      </p>
      <br>
      <p style="font-size: 14px; color: #666;">
        Thank you for using Midas Tracking!
      </p>
    </div>
  `;

  // Send Email
  if (resend) {
    await resend.emails.send({
      from: `Midas Tracking <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: `Package Update: ${status}`,
      html,
    });
  } else {
    console.warn("Resend not configured - skipping email send");
  }

  // Send SMS if phone is provided
  if (phone && process.env.TWILIO_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    await client.messages.create({
      body: `Your package ${trackingNumber} is now ${status}. Track: ${trackingUrl}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
  }
}
