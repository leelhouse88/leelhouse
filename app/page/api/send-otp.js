const twilio = require('twilio');

const sendOtp = async (mobileNumber, otp) => {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  try {
    const message = await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobileNumber,
    });

    return message;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP via Twilio');
  }
};

module.exports = sendOtp;
