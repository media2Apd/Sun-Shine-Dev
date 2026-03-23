import { sendMail } from "../config/mailer.js";

export default async function sendEmail(to, text) {
  try {
    await sendMail({
      to,
      subject: "Verification Code",
      text,
      html: `<p>${text}</p>`
    });
  } catch (err) {
    console.error("Email send failed:", err);
    throw err;
  }
}