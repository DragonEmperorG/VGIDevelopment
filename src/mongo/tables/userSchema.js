var mongoose = require('mongoose');
var mongoBase = require('../mongoBase');
var Schema = mongoose.Schema;
//表-热门文章
var ArticlesSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: String,
    email: String,
    firstName: String,
    passward: String,
    firstName:String
});
//新闻缓存
var _tableName = "users",
    //单页显示个数
    _pageCount = 10,
    _mongoBase = new mongoBase(_tableName, _pageCount);
//查询
ArticlesSchema.methods.query = function (args, callback) {
    var model = this.model(_tableName);
    _mongoBase.query(model, args, callback);
};
//修改
ArticlesSchema.methods.modify = function (objId, newObject, callback) {
    //http://mongoosejs.com/docs/api.html#query_Query-findOneAndRemove
    var model = this.model(_tableName);
    _mongoBase.modify(model, objId, newObject, callback);
};
//增
ArticlesSchema.methods.add = function (newObject, callback) {
    var model = this.model(_tableName);
    _mongoBase.add(model, newObject, callback);
};
//删
ArticlesSchema.methods.remove = function (objId, callback) {
    var model = this.model(_tableName);
    _mongoBase.remove(model, objId, callback);
};
//注册模型
var _inilizationModel = function (conn) {
    var modelType = conn.model(_tableName, ArticlesSchema, _tableName);
    return new modelType();
};
//表结构导出
module.exports = {
    //初始化
    InilizationModel: _inilizationModel,
};