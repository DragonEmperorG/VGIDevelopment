var users = require('../controllers/users.server.controller')
var passport = require('passport')

module.exports = function(app) {
    app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS')
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api_key, Authorization, token')
            next()
        })
        //  处理用户相关的路由请求
    app.route('/users/register') // 用户注册
        .post(users.register)

    app.route('/users/login/local') // 本地用户登录
        .post(passport.authenticate('local', { session: false }), users.login)

    // 本地用户登出
    // 首先使用token令牌取出用户信息
    app.route('/users/logout/local') // 本地用户登出
        .get(users.jwtAuth, users.requireAuth, users.logout)

    app.route('/users/forgot/local') // 本地用户忘记密码
        .post(users.forgot)

    app.route('/users/forgotandreset/local') // 本地用户忘记并重置密码
        .post(users.forgotAndReset)

    app.route('/users/reset/password') // 本地用户重置密码
        .post(users.jwtAuth, users.requireAuth, users.resetPassword)

    //获取该用户所做的所有地图标记
    app.route('/users/info/getAllMapLabels')
        .post(users.jwtAuth, users.requireAuth, users.getAllMapLabel)
}