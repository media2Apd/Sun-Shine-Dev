export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. Clear old OTPs
    await TempOtp.deleteMany({ email });

    // 3. Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // 4. Save OTP
    await TempOtp.create({
      email,
      otp,
      expireAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // ✅ 5. SEND EMAIL (THIS WAS MISSING)
    await sendEmail(email, `Your password reset OTP is: ${otp}`);

    // 6. Send Response
    res.json({
      success: true,
      message: "OTP sent successfully",
      // ❌ remove otp in production
      otp,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};