// 引入 mongoose 库
const mongoose = require('mongoose')

// 定义笔记的数据库模式
const noteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // 添加favoriteCount属性
        favoriteCount: {
            type: Number,
            default: 0
        },
        // 添加favoritedBy属性
        favoritedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: true,
    }
)

// 通过模式定义 Note 模型
const Note = mongoose.model('Note', noteSchema)

//导出模型
module.exports = Note;