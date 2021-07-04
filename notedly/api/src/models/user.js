// 引入 mongoose 库
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: { unique: true }
        },
        email: {
            type: String,
            required: true,
            index: { unique: true }
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

// 通过模式定义 Note 模型
const User = mongoose.model('User', UserSchema)

//导出模型
module.exports = User;