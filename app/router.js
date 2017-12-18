module.exports = app => {
    const access = app.middlewares.access();
    app.get('/api/log/usage', access, app.controller.log.usage);
    app.get('/api/log/usageByIdAndTime',access, app.controller.log.getByIdAndTime);

    //user
    app.post('/api/user/register', app.controller.user.register);
    app.post('/api/user/login', app.controller.user.login);
    app.post('/api/user/loginOut', app.controller.user.loginOut);
    app.get('/api/user/checkEmail', app.controller.user.checkEmail);
    app.get('/api/user/session', app.controller.user.session);

    //poject
    app.get('/api/project', access, app.controller.app.findById)
    app.post('/api/project', access, app.controller.app.createApp)
    app.get('/api/projects', access, app.controller.app.getAllByUserId)

}