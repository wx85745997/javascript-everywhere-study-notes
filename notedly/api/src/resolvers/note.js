module.exports = {
    // 解析笔记作者的信息
    author: async (note, args, { models }) => {
        return await models.User.findById(note.author)
    },
    // 解析笔记的收藏人信息
    favoritedBy: async (note, args, { models }) => {
        return await models.User.find({ _id: note.favoritedBy })
    }
};