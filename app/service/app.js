
const Service = require('egg').Service;
const crypto = require('crypto');

class AppService extends Service {
    async findAllByUserId(userId) {
        const results = await this.app.mysql.select('app', {
            where:{ userId: userId}
        });
        let arr = [];
        for(let i = 0; i < results.length; i++) {
            arr.push({
                appName: results[i].appName,
                appId: results[i].id 
            })    
        }
        return arr; 
   }
   async findById(appId) {
        const result = await this.app.mysql.get('app', 
           {id: appId}
        );
        return result;
   }
   async createApp({name, type = 1}) {
        const app = await this.app.mysql.insert('app', {
            appName: name,
            type: type,
            appKey:  crypto.createHash('md5').update(name, 'utf8').digest('hex'),
            cratedTime: new Date().toLocaleString(),
            userId: this.service.user.getUserId()
        }) 
        const updateSuccess = (app.affectedRows === 1);
        return updateSuccess;  
   }
}

module.exports = AppService;