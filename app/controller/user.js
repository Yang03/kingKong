const Controller = require('egg').Controller;

class UserController extends Controller {
    constructor(ctx) {
        super(ctx)
    }
    async register() {
        //const {ctx} = this;
        const result = await this.service.user.create(this.ctx.request.body);
        if (!result) {
            this.ctx.body = {
                'code': 1002,
                'message': '注册失败'
            };
        } else {
            this.ctx.body = {
                'code': 0
            };
        } 
    }
    async login() {
        const { ctx } = this;
        const user = await this.service.user.login(this.ctx.request.body);
        if (!user) {
            ctx.body = {
                'code': 1001,
                'message': '用户名或者密码错误'
            };    
        } else {
            ctx.cookies.set('userId', user.id.toString(), {
                maxAge: 3600 * 1000,
                overwrite: true
            })
            ctx.cookies.set('userName', encodeURIComponent(user.name.toString()), {
                maxAge: 3600 * 1000,
                overwrite: true,
                httpOnly: false
            })
            ctx.body = {
                code: 0
            }; 
        }  
           
    }
    loginOut() {
        this.ctx.cookies.set('userId', '', {
            maxAge: -1,
            overwrite: true
        })
        this.ctx.status = 200;
    }
    async checkEmail() {
        const email = this.ctx.qurey.email;
        const user = await this.service.user.findByEmail(email);
    
        if (user) {
            this.ctx.body = {
                'code': 1003,
                'message': '邮箱已经被注册'
            };
        } else {
            this.ctx.body = {
                code: 0
            };
        }
    }
}

module.exports = UserController;