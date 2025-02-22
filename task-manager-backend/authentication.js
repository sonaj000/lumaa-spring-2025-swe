const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.header('Authorization');
    console.log("🔍 Received Auth Header:", authHeader);

    if (!authHeader) {
        console.log("❌ No token provided!");
        return res.status(401).json({ error: 'Access Denied: No token provided' });
    }

    try {
        const token = authHeader.split(" ")[1];
        console.log("🔍 Extracted Token:", token);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token Verified:", verified);

        req.userID = verified.userID; // Ensure it matches the token's key
        console.log("✅ Assigned req.userID:", req.userID);

        next();
    } catch (err) {
        console.log("❌ Invalid Token!");
        return res.status(403).json({ error: 'Invalid token' });
    }
}

module.exports = authenticateToken;

