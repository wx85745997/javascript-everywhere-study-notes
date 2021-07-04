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
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

// 通过模式定义 Note 模型
const Note = mongoose.model('Note', noteSchema)

//导出模型
module.exports = Note;