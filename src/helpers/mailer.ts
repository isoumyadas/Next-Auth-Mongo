import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// enum EmailType {
//   verify = "VERIFY",
//   forgotPassword = "FORGOT_PASSWORD",
// }
type SendEmailT = {
  email: string;
  emailType: string;
  userId: string;
};

export const sendEmail = async ({ email, emailType, userId }: SendEmailT) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hasedToken = await bcrypt.hash(userId.toString(), salt);
    const forgotPasswordHashedToken = await bcrypt.hash(
      userId.toString(),
      salt
    );

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hasedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: forgotPasswordHashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    // HTML for verfify Email
    const verifyEmailHtml = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hasedToken}">here</a> to verify your email or copy and paste the link below in your browser
      
      <br>

      ${process.env.DOMAIN}/verifyemail?token=${hasedToken}
      
      </p>`;

    // HTML for forgot pass
    const forgotPasswordHtml = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${forgotPasswordHashedToken}">here</a> to reset your password or copy and paste the link below in your browser.
      
      <br>

      ${process.env.DOMAIN}/forgotPassword?token=${forgotPasswordHashedToken}
      
      </p>`;

    // transporter

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "abelardo77@ethereal.email",
        pass: "WmKUDtPUG5JMTq2Ann",
      },
    });

    // mail options
    const mailOptions = {
      from: "dassoumyayt@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",

      html: emailType === "VERIFY" ? verifyEmailHtml : forgotPasswordHtml,
    };

    const mailRes = await transporter.sendMail(mailOptions);

    return mailRes;
  } catch (error) {
    console.error("Something went wrong in SendEmail: ", error);
  }
};
