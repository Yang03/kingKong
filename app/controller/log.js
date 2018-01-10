
const Controller = require('egg').Controller;
const Time = require('../util').time;

class LogController extends Controller {
    constructor(ctx) {
        super(ctx)
    }
    async usage() {
        const {ctx} = this;
        let startTime;
        let endTime;
        let appId;
        const userId = this.service.user.getUserId();
        const apps = await this.service.app.findAllByUserId(userId);
        if (apps.length > 0) {
            const firstApp = apps[0].appId;
            const type = apps[0].type;
            let now = Math.floor(new Date().getTime());
            startTime = startTime || now - 7 * 3600 * 24 * 1000;
            endTime = endTime || now;
            startTime = Time.getYMD(startTime);
            endTime = Time.getYMD(endTime);
            const logs = await this.service.log.getTotalTime(startTime, endTime, firstApp, type);
            ctx.body = {
                logs: logs,
                apps: apps
            };
        } else {
            ctx.body = {
                logs: [],
                apps: []
            };
        } 
    }
    async getByIdAndTime() {
        const {ctx} = this;
        let {startTime, endTime, appId, type} = ctx.request.query;
        let now = Math.floor(new Date().getTime());
        startTime = startTime || now - 7 * 3600 * 24 * 1000;
        endTime = endTime || now;
        startTime = Time.getYMD(startTime);
        endTime = Time.getYMD(endTime);
        const logs = await this.service.log.getTotalTime(startTime, endTime, appId, type);
        ctx.body = {
            logs: logs
        };
    }
}

module.exports = LogController;