import jwt from 'jsonwebtoken'

export const genAdminToken = (user, res) => {
    try {
        const payload = {
            id: user._id,



        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }) // 1h, 60sec(default)

        console.log(token);
        res.cookie("Bourbon", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        })

    } catch (error) {
        throw error

    }
}