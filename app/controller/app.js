const Controller = require('egg').Controller;

class AppController extends Controller {
    constructor(ctx) {
        super(ctx)
    }
    async createApp() {
        //const {ctx} = this;
        const result = await this.service.app.createApp(this.ctx.request.body);
        if (!result) {
            this.ctx.body = {
                'code': 1201,
                'message': '创建失败'
            };
        } else {
            this.ctx.body = {
                'code': 0
            };
        }
        
    }
    async findById() {
        const result = await this.service.app.findById(this.ctx.query.appId);
        this.ctx.body = result;
    }
    async getAllByUserId() {
        const result = await this.service.app.findAllByUserId(this.service.user.getUserId());
        this.ctx.body = result;
    }
}

module.exports = AppController;