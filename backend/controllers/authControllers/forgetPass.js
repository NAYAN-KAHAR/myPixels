import authModel from '../../models/authModel.js';
import otpModel from '../../models/otpModel.js';
import nodemailer from 'nodemailer';

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'subhok684@gmail.com',
        pass: 'bvxg jcqu ssar hybm', // This should be handled securely
    }
});

// Generate OTP
const generateOtp = () => {
    const otp = "0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
        let genOtp = Math.floor(Math.random() * otp.length);
        result += otp[genOtp];
    }
    return result;
};

// Send OTP email
const sendOtpToEmail = async (email, otp) => {
    const mailOptions = {
        from: 'subhok684@gmail.com',
        to: email,
        subject: 'Your OTP for password reset',
        text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (err) {
        console.log('Error sending email:', err); // Fixed the typo: 'error' should be 'err'
    }
};

const forgetPassword = async (req, res) => {
    try {
        const userEmail = req.body.email;
        const existingUser = await authModel.findOne({ email: userEmail });

        if (existingUser) {
            // Check if OTP already exists for the user
            const existingOtp = await otpModel.findOne({ email: userEmail });

            // Check if the existing OTP has expired
            if (existingOtp && existingOtp.expiresAt > Date.now()) {
                // OTP is still valid
                return res.status(400).send({ message: 'OTP already sent. Please wait for it to expire or request a new one.' });
            }

            // If OTP exists but expired or doesn't exist, delete expired OTP (if any)
            if (existingOtp) {
                await otpModel.deleteOne({ email: userEmail });
            }

            const genOtp = generateOtp();
            const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes validity

            const setOtpData = {
                otp: genOtp,
                email: existingUser.email,
                expiresAt: otpExpiresAt,
            };
            const setOtp = await otpModel.create(setOtpData);

            // Send OTP email
            await sendOtpToEmail(existingUser.email, genOtp);

            // Store the user's email in session
            req.session.email = existingUser.email;

            console.log('OTP:', genOtp);
            console.log('Session email:', req.session.email);

            return res.status(200).send({ message: 'OTP sent successfully' });
        } else {
            res.status(404).send({ message: 'Email is not valid' });
        }
    } catch (err) {
        res.status(500).send({ error: err });
        console.log('forgetPassword error', err);
    }
};

export default forgetPassword;
