'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {

    };
    
    User.init({
        // Cột id: UUID tự sinh, là khóa chính
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // dùng thư viện uuid => uuidv4 hoặc Sequelize tự sinh UUID (v4): DataTypes.UUIDV4
            allowNull: false,
            primaryKey: true
        },
        // Cột email: email của user, kiểu chuỗi, không null, là duy nhất
        email: { 
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true 
        },
        // Cột password: mật khẩu của user, kiểu chuỗi, không null
        password: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        // Cột full_name: họ tên của user, kiểu chuỗi, không null
        full_name: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        // Cột role: chức vụ của user, không null, mặc định là carpenter (thợ mộc)
        role: {
            type: DataTypes.ENUM('admin', 'employee', 'candidate', 'recruiter'),
            allowNull: false,
        },
        // Cột dob: ngày sinh của user, kiểu ngày tháng, không null
        dob: {
            type: DataTypes.DATE,
            allowNull: true
        },
        gender: {
            type: DataTypes.ENUM('female', 'male', 'other'),
            allowNull: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        career: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fb_link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        linkedin_link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_reset_password: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_actived: {
            type: DataTypes.INTEGER,
            defaultValue: 0 // 1: Hoạt động, -1: Vô hiệu hóa
        },
        avatar_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name_url: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'User'
    });
    return User;
}