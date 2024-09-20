export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { mobile, otp } = req.body;

        try {
            // Retrieve the OTP from your database or cache and compare it

            const storedOtp = '123456'; // Replace with actual OTP retrieval logic

            if (storedOtp === otp) {
                res.status(200).json({ message: 'OTP verified successfully' });
            } else {
                res.status(400).json({ message: 'Invalid OTP' });
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            res.status(500).json({ message: 'Failed to verify OTP' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
