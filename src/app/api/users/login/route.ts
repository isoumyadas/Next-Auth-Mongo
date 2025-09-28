import { connectDB } from "@/lib/dbConfig";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { NextResponse, NextRequest } from "next/server"; // This is used for AppRouter and Middleware

// connect DB
connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }

    // creating jwt token

    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const res = NextResponse.json({
      message: "Logged In Success",
      success: true,
    });

    // You could access the cookies by doing the above action

    res.cookies.set("token", token, { httpOnly: true });

    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
