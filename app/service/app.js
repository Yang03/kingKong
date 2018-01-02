
const Service = require('egg').Service;
const appKeyGen = require('../util/appKeyGen').genKey;


class AppService extends Service {
    async findAllByUserId(userId) {
        const results = await this.app.mysql.select('app', {
            where:{ userId: userId}
        });
        let arr = [];
        for(let i = 0; i < results.length; i++) {
            arr.push({
                appName: results[i].appName,
                appId: results[i].id,
                type:  results[i].type
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
            cratedTime: new Date().toLocaleString(),
            userId: this.service.user.getUserId()
        }) 
        const success = (app.affectedRows === 1);
        if (success) {
            return await this.updateAppKey(app.insertId)    
            
        } else {
            return false;
        }
         
   }
   async updateAppKey(id) {
        const app = await this.app.mysql.update('app', {
            id: id,
            appkey: appKeyGen(id)
        }) 
        return app.affectedRows === 1;
   }
}

module.exports = AppService;