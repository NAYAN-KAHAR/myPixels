

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            path: '/', // Ensure path matches when setting and clearing cookies
        });

        return res.status(200).send({ message: 'User logged out successfully' });
    } catch (err) {
        console.error('Logout Error:', err);
        return res.status(500).send({ message: 'Failed to logout' });
    }
};

export default logoutUser;
