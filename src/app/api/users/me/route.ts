import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connectDB } from "@/lib/dbConfig";
import { User } from "@/models/userModel";

import { NextResponse, NextRequest } from "next/server"; // This is used for AppRouter and Middleware

// connect DB
connectDB();

export async function POST(req: NextRequest) {
  try {
    // extract data from token
    const userId = await getDataFromToken(req);
    const user = await User.findOne({ _id: userId }).select("-password");

    // check if their is no user
    if (!user) {
      return NextResponse.json({ error: "No User Found" }, { status: 400 });
    }

    // if yes
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
