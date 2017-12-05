module.exports = app => {
    const access = app.middlewares.access();
    app.get('/api/log/usage', access, app.controller.log.usage);

    //user
    app.post('/api/user/register', app.controller.user.register);
    app.post('/api/user/login', app.controller.user.login);
    app.post('/api/user/loginOut', app.controller.user.loginOut);
    app.get('/api/user/checkEmail', app.controller.user.checkEmail);

}