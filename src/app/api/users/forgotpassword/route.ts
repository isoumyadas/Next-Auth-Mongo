import { connectDB } from "@/lib/dbConfig";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server"; // This is used for AppRouter and Middleware

// connect DB
connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { newpassword, email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User Not Found by This Email..." },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);

    user.password = hashedPassword;

    await user.save();

    return NextResponse.json(
      { message: "Password Changed Successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
