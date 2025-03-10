const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; // Lấy token từ headers

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided",
            status: "error"
        });
    }

    const tokenParts = authHeader.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({
            message: "Invalid token format",
            status: "error"
        });
    }

    const token = tokenParts[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid token",
                status: "error"
            });
        }

        if (user?.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                message: "Forbidden: Admin access required",
                status: "error"
            });
        }
    });
};

const authUserMiddleware = (req, res, next) => {
    const authHeader = req.headers.token; // Lấy token từ headers
    const userId = req.params.id; // Lấy user ID từ params

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided",
            status: "error"
        });
    }

    const tokenParts = authHeader.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({
            message: "Invalid token format",
            status: "error"
        });
    }

    const token = tokenParts[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid token",
                status: "error"
            });
        }

        if (user?.isAdmin || user?.id === userId) {
            next();
        } else {
            return res.status(403).json({
                message: "Forbidden: Access denied",
                status: "error"
            });
        }
    });
};

module.exports = {
    authMiddleware,
    authUserMiddleware
};
