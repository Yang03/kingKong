const Service = require('egg').Service;
const crypto = require('crypto');
///const Md5 = crypto.createHash('md5');

class UserService extends Service {
    constructor(ctx) {
        super(ctx)
    }
    async find(query) {
        ///console.log(query)
        const user = await this.app.mysql.get('user', query);
       // console.log(user)
        return user; 
    }
    async login({email, password}) {
        const user = await this.find({email: email});
        if (this.comparePassword(user.password, password)) {
            return user;
        }
        return null;
    }
    async findByEmail(email) {
        const user = await this.find({email: email});
        return user;
    }
    async create({email, name, password, company, mobile, companyType}) {
        const genPassword = this.genPassword(password);
        const user = await this.app.mysql.insert('user', {
            email: email,
            name: name,
            password: genPassword,
            company: company,
            mobile: mobile,
            companyType:  companyType
        }) 
        const updateSuccess = (user.affectedRows === 1);
        return updateSuccess;      
    }
    comparePassword(genPassword, password) {
        return this.getPassword(genPassword) == crypto.createHash('md5').update(password, 'utf8').digest('hex');
    }
    genPassword(password) {
        const salt = crypto.randomBytes(8);
        return crypto.createHash('md5').update(password, 'utf8').digest('hex') + salt.toString('hex');
    }
    getPassword(genPassword) {
        return genPassword.substr(0, 32);
    }
    getUserId () {
        return this.ctx.cookies.get('userId');
    }
}

module.exports = UserService;