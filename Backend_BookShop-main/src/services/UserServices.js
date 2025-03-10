const User = require("../models/UserModel")
const bcrypt = require("bcryptjs");
const { genneralAccess, genneralRefreshAccess } = require("./jwtService");

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, address, phone } = newUser
        try {
            // Validate email format
            if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                return resolve({
                    status: 'ERR',
                    message: 'Invalid email format'
                })
            }

            // Validate required fields
            if (!name || !password || !address) {
                return resolve({
                    status: 'ERR',
                    message: 'Missing required fields'
                })
            }

            const checkUser = await User.findOne({ email: email })
            if (checkUser !== null) {
                return resolve({
                    status: 'ERR',
                    message: 'Email already exists',
                })
            }

            // Validate password strength
            if (password.length < 6) {
                return resolve({
                    status: 'ERR',
                    message: 'Password must be at least 6 characters long'
                })
            }

            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                address,
                phone: phone || null, // Optional field
            })
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'User created successfully',
                    data: {
                        name: createdUser.name,
                        email: createdUser.email,
                        address: createdUser.address,
                        phone: createdUser.phone,
                    }
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const LoginUser = (userlogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userlogin
        try {
            const checkUser = await User.findOne({ email: email })
            if (!checkUser) {
                return resolve({
                    status: 'ERR',  // Đổi từ "ok" thành "ERR"
                    message: 'User not found',
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if (!comparePassword) {
                return resolve({
                    status: 'ERR',  // Đổi từ "ok" thành "ERR"
                    message: 'The password or user is incorrect',
                })
            }
            const access_token = await genneralAccess({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await genneralRefreshAccess({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'OK', // Viết hoa để phân biệt thành công
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById(id)
            console.log('checkerUser', checkUser)
            if (checkUser === null) {
                return resolve({
                    status: 'ok',
                    message: 'user not found',
                })
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'ok',
                message: 'SUCCESS',
                data: updatedUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById(id)
            console.log('checkerUser', checkUser)
            if (checkUser === null) {
                return resolve({
                    status: 'ok',
                    message: 'user not found',
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: 'ok',
                message: 'DELETE USER SUCCESS',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find({})
            resolve({
                status: 'ok',
                message: ' SUCCESS',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(id)
            if (user === null) {
                return resolve({
                    status: 'ok',
                    message: 'user not found',
                })
            }
            resolve({
                status: 'ok',
                message: 'SUCCESS',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    LoginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser
};