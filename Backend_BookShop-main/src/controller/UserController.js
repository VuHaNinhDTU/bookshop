const UserServices = require("../services/UserServices")
const jwtService = require("../services/jwtService")
const User = require("../models/UserModel")
const bcrypt = require("bcryptjs");


const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: "Please fill in all fields"
            })
        } else if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: "Password and Confirm Password must be the same"
            })
        }
        const userData = await UserServices.createUser(req.body)
        return res.status(201).json(userData);
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password) {
            return res.status(400).json({ status: 'ERR', message: "Please fill in all fields" });
        } else if (!isCheckEmail) {
            return res.status(400).json({ status: 'ERR', message: "Invalid email format" });
        }

        const response = await UserServices.LoginUser(req.body);

        const { refresh_token, ...newResponse } = response;
        res.cookie('refresh_token', refresh_token, { httpOnly: true, secure: false, samesite: 'strict' });
        return res.status(200).json(newResponse);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const userid = req.params.id
        const data = req.body
        if (!userid) {
            return res.status(200).json({
                status: 'ERR',
                message: "The userId is requires"
            })
        }
        console.log('userId', userid)
        const userData = await UserServices.updateUser(userid, data)
        return res.status(200).json(userData);
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const userid = req.params.id
        if (!userid) {
            return res.status(200).json({
                status: 'ERR',
                message: "The userId is requires"
            })
        }
        const userData = await UserServices.deleteUser(userid)
        return res.status(200).json(userData);
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const userData = await UserServices.getAllUser()
        return res.status(200).json(userData);
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailUser = async (req, res) => {
    try {
        const userid = req.params.id
        if (!userid) {
            return res.status(200).json({
                status: 'ERR',
                message: "The userId is requires"
            })
        }
        const userData = await UserServices.getDetailUser(userid)
        return res.status(200).json(userData);
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    console.log('req.cookies.refresh_token', req.cookies.refresh_token)
    try {
        const token = req.cookies.refresh_token // Lấy từ req.cookies
        if (!token) {
            return res.status(401).json({
                status: 'ERR',
                message: "Token is required"
            });
        }
        const userData = await jwtService.refreshTokenJwtService(token);
        return res.status(200).json(userData);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};
const logoutUser = async (req, res) => {
    res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });
    res.status(200).json({ message: "Logout successful" });

};

module.exports = {
    createUser,
    LoginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    refreshToken,
    logoutUser
}