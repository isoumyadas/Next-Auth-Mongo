import { connectDB } from "@/lib/dbConfig";
import { User } from "@/models/userModel";

import { NextResponse, NextRequest } from "next/server"; // This is used for AppRouter and Middleware

// connect DB
connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    // NOTE: Always think about asumptions

    // Checking users token and tokenExpiry
    const user = await User.findOne({
      verifyToken: reqBody.token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid Token!!!!!" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Email Verified Successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// so here, when user clicked on verify email button the token which was sent by axios will be used for db query to find the user who signed up recently or below < 1hr. once user is found we will remove the verifyToken and expiry save the user. so user won't need to again verify.
