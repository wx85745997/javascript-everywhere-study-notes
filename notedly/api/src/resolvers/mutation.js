const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
const { AuthenticationError, ForbiddenError } = require(
    "apollo-server-express"
);
require("dotenv").config();
const gravatar = require("../util/gravatar");

module.exports = {
    newNote: async (parent, args, { models, user }) => {
        // 如果上下文中没有用户，抛出 AuthenticationError
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note')
        }
        return await models.Note.create({
            content: args.content,
            // 引用作者在Mongo数据库中的ID
            author: mongoose.Types.ObjectId(user.id),
        });
    },
    deleteNote: async (parent, { id }, { models, user }) => {
        // 如果上下文中没有用户，抛出 AuthenticationError
        if (!user) {
            throw new AuthenticationError('You must be signed in to delete a note')
        }

        // 查找笔记
        const note = await models.Note.findById(id);
        // 如果笔记的属主于当前用户不匹配，抛出ForbiddenError
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("You don't  have premissions to detele the note");
        }

        try {
            // 通过所有检查后删除笔记
            await note.remove();
            return true;
        } catch (err) {
            return false;
        }
    },
    updateNote: async (parent, { content, id }, { models, user }) => {
        // 如果上下文中没有用户，抛出 AuthenticationError
        if (!user) {
            throw new AuthenticationError('You must be signed in to delete a note')
        }
        // 查找笔记
        const note = await models.Note.findById(id);
        // 如果笔记的属主于当前用户不匹配，抛出ForbiddenError
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("You don't  have premissions to update the note");
        }
        return await models.Note.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    content
                }
            },
            {
                new: true
            }
        );
    },
    signUp: async (parent, { username, email, password }, { models }) => {
        // 规范电子邮件地址
        email = email.trim().toLowerCase();
        // 计算密码的哈希值
        const hashed = await bcrypt.hash(password, 10);
        //生成 Gravatar URL
        const avatar = gravatar(email);
        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            })
            return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        } catch (err) {
            console.log(err);
            // 如果创建账户遇到问题，抛出错误
            throw new Error('Error creating account');
        }
    },
    signIn: async (parent, { username, email, password }, { models }) => {
        if (email) {
            // 规范电子邮件地址
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({
            $or: [{ email, username }]
        });

        // 如未找到用户，抛出AuthenticationError
        if (!user) {
            throw new AuthenticationError("Error signing in");
        }
        // 如果密码不匹配，抛出ForbiddenError
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new ForbiddenError("Error signing in");
        }
        // 创建并返回 JWT
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    },
    toggleFavorite: async (parent, { id }, { models, user }) => {
        //如果上下文中没有用户、抛出AuthenticationError
        if (!user) {
            throw new AuthenticationError();
        }

        //检查用户是不是已经收藏了该篇笔记
        let noteCheck = await models.Note.findById(id);
        const hasUser = noteCheck.favoritedBy.indexOf(user.id);

        //如果当前用户在列表中
        //把用户从列表中删除，并把`favoriteCount`的值减少一个
        if (hasUser >= 0) {
            return await models.Note.findByIdAndUpdate(
                id, {
                $pull: {
                    favoritedBy: mongoose.Types.ObjectId(user.id)
                },
                $inc: {
                    favoriteCount: -1
                }
            }, {
                // 把new设为true,返回更新后的笔记
                new: true
            }
            )
        } else {
            // 如果当前用户不在列表中
            // 把用户添加到列表中，并把 favoriteCount的值增加一个
            return await models.Note.findByIdAndUpdate(id, {
                $push: {
                    favoritedBy: mongoose.Types.ObjectId(user.id)
                },
                $inc: {
                    favoriteCount: 1
                }
            }, {
                // 把new设为true,返回更新后的笔记
                new: true
            })

        }
    }
};