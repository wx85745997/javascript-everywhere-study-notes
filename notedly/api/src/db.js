const mongoose = require('mongoose')

module.exports = {
    content: DB_HOST => {
        // 使用Mongo驱动新的URL字符串解析器
        mongoose.set('useNewUrlParser', true);
        // 使用findOneAndUpdate()替代 findAndModify()
        mongoose.set('useFindAndModify', false);
        // 使用createIndex()替代 ensureIndex()
        mongoose.set('useCreateIndex', true);
        // 使用新的服务器发现和监控引擎
        mongoose.set('useUnifiedTopology', true);
        // 连接数据库
        mongoose.connect(DB_HOST);
        // 如果连接成功，输出提示
        mongoose.connection.on('open', () => {
            console.log('Mongoose connection open to ' + DB_HOST);
        });
        // 如果连接失败，记录日志
        mongoose.connection.on('error', err => {
            console.error(err);
            console.log(`MongoDB connection error.Please make sure MongoDB is running`)
            process.exit();
        });

    },
    close: () => {
        mongoose.connection.close();
    }
}