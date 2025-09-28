import { connectDB } from "@/lib/dbConfig";
import { NextResponse, NextRequest } from "next/server"; // This is used for AppRouter and Middleware

// connect DB
connectDB();

export async function GET(req: NextRequest) {
  try {
    const res = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    });

    // removing cookies

    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
