const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. Get token from header
    const token = req.header('Authorization');

    // Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // 2. Verify token
        // Token format: "Bearer <token>"
        const bearerToken = token.split(' ')[1];

        if (!bearerToken) {
            return res.status(401).json({ message: 'Token format is "Bearer <token>"' });
        }

        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);

        // 3. Add user payload to request object
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
