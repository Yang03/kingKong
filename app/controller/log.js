const Controller = require('egg').Controller;

class LogController extends Controller {
    constructor(ctx) {
        super(ctx)
    }
    async usage() {
        const {ctx} = this;
        //let {startTime, endTime, appId = 0} = ctx.body;
        // const userId = this.service.user.getUserId();
        // let endTime = new Date().getTime();
        // let startTime = endTime - 7 * 3600 * 1000;
        // endTime = Time.getYMD(endTime);
        // startTime = Time.getYMD(startTime);
        const logs = await this.service.log.getTotalTime('2017-09-22', '2017-09-25', 161305, 0);
        ctx.body = logs;
    }
}

module.exports = LogController;