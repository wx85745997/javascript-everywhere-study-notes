const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthenticationError, ForbiddenError } = require(
    "apollo-server-express"
);
require("dotenv").config();
const gravatar = require("../util/gravatar");

module.exports = {
    newNote: async (parent, agrs, { models }) => {
        return await models.Note.create({
            content: agrs.content,
            author: "Adam Scott",
        });
    },
    deleteNote: async (parent, { id }, { models }) => {
        try {
            await models.Note.findOneAndRemove({ _id: id });
            return true;
        } catch (err) {
            return false;
        }
    },
    updateNote: async (parent, { content, id }, { models }) => {
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
        console.log('user', user)
        console.log('password', password)
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new ForbiddenError("Error signing in");
        }
        // 创建并返回 JWT
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    }
};