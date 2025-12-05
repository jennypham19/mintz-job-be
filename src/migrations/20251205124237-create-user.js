'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Bật extension pgcrypto nếu chưa có (để tạo UUID)
    await queryInterface.sequelize.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
    await queryInterface.createTable('Users', {
        // id của user, kiểu UUID, khóa chính, không null, sự sinh UUID v4 khi tạo mới
        id: { 
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('gen_random_uuid()'), // Nếu dùng PostgreSQL, tạo UUID bằng pgcrypto
            // hoặc với MySQL: Sequelize.literal('(UUID())')
            primaryKey: true,
            allowNull: false
        },
        // Cột email: email của user, kiểu chuỗi, không null, là duy nhất
        email: { 
            type: Sequelize.STRING, 
            allowNull: false, 
            unique: true 
        },
        // Cột password: mật khẩu của user, kiểu chuỗi, không null
        password: { 
            type: Sequelize.STRING, 
            allowNull: false 
        },
        // Cột full_name: họ tên của user, kiểu chuỗi, không null
        full_name: { 
            type: Sequelize.STRING, 
            allowNull: false 
        },
        // Cột role: chức vụ của user, không null, mặc định là carpenter (thợ mộc)
        role: {
            type: Sequelize.ENUM('admin', 'employee', 'candidate', 'recruiter'),
            allowNull: false,
        },
        // Cột dob: ngày sinh của user, kiểu ngày tháng, không null
        dob: {
            type: Sequelize.DATE,
            allowNull: true
        },
        // Cột code: mã của user, kiểu chuỗi, không null
        gender: {
            type: Sequelize.ENUM('female', 'male', 'other'),
            allowNull: true
        },
        // Cột phone: số điện thoại của user, kiểu chuỗi, không null
        phone: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        // Cột address: địa chỉ quê quán của user, kiểu chuỗi, có thể null
        address: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        career: {
            type: Sequelize.STRING,
            allowNull: true
        },
        fb_link: {
            type: Sequelize.STRING,
            allowNull: true
        },
        linkedin_link: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // Cột avatar_url: đường link ảnh đại diện của user, kiểu chuỗi, không null
        avatar_url: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // Cột name_url: tên ảnh đại diện của user, kiểu chuỗi, không null
        name_url: {
            type: Sequelize.STRING,
            allowNull: true
        },
        // Cột is_actived: trạng thái kích hoạt của user, kiểu boolean, mặc định là true
        is_actived: {
            type: Sequelize.INTEGER,
            defaultValue: 0 // true là đã kích hoạt, false là vô hiệu hóa
        },
        // Cột is_reset_password: trạng thái reset mật khẩu của user, kiểu boolean, mặc định là false
        is_reset_password: {
            type: Sequelize.BOOLEAN,
            defaultValue: false // true là đã reset, false là không
        },
        // Cột createdAt: ngày tạo, kiểu ngày tháng, không null
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        // Cột updatedAt: ngày chỉnh sửa, kiểu ngày tháng, không null
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
};
