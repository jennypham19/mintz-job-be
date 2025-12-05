const { User, Token } = require('../models');
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('../utils/ApiError');
// const userService = require('../services/user.service');

// Đăng nhập
const loginWithEmailAndPassword = async (email, password) => {
    try {
        const userDB = await User.findOne({ 
            where: { email }
        });
        if(!userDB || !(await bcrypt.compare(password, userDB.password))) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'Tên đăng nhập hoặc mật khẩu không chính xác');
        }
        if(userDB.is_actived === -1) {
            throw new ApiError(StatusCodes.FORBIDDEN, 'Tài khoản đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên');
        }
        const newUser = userDB.toJSON();
        const user = {
            id: newUser.id,
            email: newUser.email,
            fullName: newUser.full_name,
            address: newUser.address,
            avatarUrl: newUser.avatar_url,
            career: newUser.career,
            createdAt: newUser.createdAt,
            dob: newUser.dob,
            gender: newUser.gender,
            nameUrl: newUser.nam_url,
            isActived: newUser.is_actived,
            isResetPassword: newUser.is_reset_password,
            phone: newUser.phone,
            role: newUser.role,
            updatedAt: newUser.updatedAt,
            work: newUser.work,
            fbLink: newUser.fb_link,
            linkedinLink: newUser.linkedin_link
        }
        return user;
    } catch (error) {
        if(error instanceof ApiError) throw error;
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Server error during login process. ' + error.message);
    }
}

// Đăng ký
const registerWithEmailAndPassword = async(registerBody) => {
    try {
        const { email, password, confirmPassword, fullName } = registerBody;
        const userDB = await User.findOne({ where: { email }});
        if(userDB){
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Email đã tồn tại');
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        await User.create({ email, password: hashedPassword, role: 'candidate', full_name: fullName })
    } catch (error) {
        if(error instanceof ApiError) throw error;
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Đã có lỗi xảy ra. ' + error.message)
    }
}

// Đăng xuất
const logout = async (refreshToken) => {
    const refreshTokenDoc = await Token.findOne({ where: { token: refreshToken, type: 'refresh'}});
    if(!refreshTokenDoc) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Refresh token không tồn tại');
    }

    await refreshTokenDoc.destroy();
}

// Lấy thông tin cá nhân
const getCurrentMe = async(id) => {
    try {
        const userDB = await User.findByPk(id, { attributes: { exclude: ['password'] }});
        if(!userDB) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại');
        }
        const newUser = userDB.toJSON();
        const user = {
            id: newUser.id,
            email: newUser.email,
            fullName: newUser.full_name,
            address: newUser.address,
            avatarUrl: newUser.avatar_url,
            career: newUser.career,
            createdAt: newUser.createdAt,
            dob: newUser.dob,
            gender: newUser.gender,
            nameUrl: newUser.nam_url,
            isActived: newUser.is_actived,
            isResetPassword: newUser.is_reset_password,
            phone: newUser.phone,
            role: newUser.role,
            updatedAt: newUser.updatedAt,
            fbLink: newUser.fb_link,
            linkedinLink: newUser.linkedin_link
        }
        return user;
    } catch (error) {
        if(error instanceof ApiError) throw error;
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Đã có lỗi xảy ra: " + error.message)
    }
}

module.exports = {
    loginWithEmailAndPassword,
    logout,
    getCurrentMe,
    registerWithEmailAndPassword
}