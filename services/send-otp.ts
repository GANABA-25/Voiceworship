import axios from "axios";

export async function sendOtp(phoneNumber: string) {
  const response = await axios.post(
    "https://sms.arkesel.com/api/otp/generate",
    {
      expiry: 5,
      length: 6,
      medium: "sms",
      message:
        "VoiceWorship Password Reset: Your verification code is %otp_code%. This code expires in 5 minutes. Do not share this code with anyone.",
      number: phoneNumber,
      sender_id: "VoWorship",
      type: "numeric",
    },
    { headers: { "api-key": process.env.ARKESEL_API_KEY } },
  );

  if (response.data?.code === "1000") return { ok: true as const };

  return {
    ok: false as const,
    message: response.data?.message || "Failed to send OTP. Try again later.",
  };
}
