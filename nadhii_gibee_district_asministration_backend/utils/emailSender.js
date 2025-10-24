import nodemailer from "nodemailer";
import "dotenv/config";

export const sendEmail = async (user_email, v_code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Nadhii Gibee District Administration" <${process.env.EMAIL}>`,
      to: user_email,
      subject: "🔐 Password Reset Request",
      html: `
        <div style="
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          padding: 20px;
        ">
          <div style="
            max-width: 500px;
            background: white;
            margin: auto;
            padding: 25px 30px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          ">
            <h2 style="color: #2b6cb0; text-align:center;">Password Reset</h2>
            <p style="font-size: 16px; color: #333;">
              Hello 👋,<br><br>
              We received a request to reset your password. Please use the code below to verify your identity:
            </p>
            <div style="
              background-color: #edf2f7;
              border-left: 4px solid #2b6cb0;
              padding: 15px;
              text-align: center;
              font-size: 22px;
              font-weight: bold;
              letter-spacing: 2px;
              color: #2b6cb0;
              margin: 20px 0;
            ">
              ${v_code}
            </div>
            <p style="font-size: 15px; color: #555;">
              This code will expire shortly. If you did not request this password reset, you can safely ignore this email.
            </p>
            <p style="text-align:center; color:#999; font-size:13px; margin-top:30px;">
              © ${new Date().getFullYear()} Jimma Zone Administration. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
