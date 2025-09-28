import { sendEmail } from "@/helpers/mailer";
import { connectDB } from "@/lib/dbConfig";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
// import { NextApiResponse, NextApiRequest } from "next"; // This is used with Pages Router
import { NextResponse, NextRequest } from "next/server"; // This is used for AppRouter and Middleware

// connect DB
connectDB();

// In the App Router, Route Handlers (like your POST function) do not receive a response object (res) as a parameter.
// Instead, your function's job is to create and return a new NextResponse object.

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("newUser:: ", newUser);

    // You can do like this too..
    //   const newUser = new User({
    //     username,
    //     email,
    //     password: hashedPassword
    // })
    // const savedUser = await newUser.save()

    // send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

    return NextResponse.json({
      message: "user registerd successfully",
      success: true,
      newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
