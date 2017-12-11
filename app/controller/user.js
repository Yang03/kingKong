const Controller = require('egg').Controller;

class UserController extends Controller {
    constructor(ctx) {
        super(ctx)
    }
    async register() {
        //const {ctx} = this;
        const result = await this.service.user.create({...this.ctx.request.body});
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
        try {
            const user = await this.service.user.login({...this.ctx.request.body});
        } catch(e) {
            ctx.body = {
                'code': 1001,
                'message': e.message
            };  
        }
       
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
            ctx.cookies.set('userName', user.name.toString(), {
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
        const email = this.ctx.request.queries.email;
        const user = await this.service.user.findByEmail(email.pop());
    
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