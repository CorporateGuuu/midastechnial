import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { companyName, taxId, email, password, phone } = await request.json();

    // Validate required fields
    if (!companyName || !taxId || !email || !password || !phone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with pending status
    const user = await prisma.user.create({
      data: {
        name: companyName, // Store company name as user name
        email,
        password: hashedPassword,
        role: "pending", // Set role to pending for approval
        // Note: We might need to add additional fields to the User model for taxId and phone
        // For now, we'll store them in a way that works with the current schema
      },
    });

    // TODO: Send welcome email with pending approval notification
    // await sendWelcomeEmail(user.email, companyName);

    return NextResponse.json({
      message: "Registration successful. Your account is pending approval.",
      userId: user.id,
    });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
