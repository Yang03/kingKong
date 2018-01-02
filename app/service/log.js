
const Time = require('../util').time;
const Service = require('egg').Service;

class LogService extends Service {
    async getTotalTime(startTime, endTime, appId, type) {
        const query = "Select * From log Where appid = ? and DATE_FORMAT(time,'%Y-%m-%d') >= ? and DATE_FORMAT(time,'%Y-%m-%d') <= ? and type = ? ";
        const logs = await this.app.mysql.query(query, [appId, startTime, endTime, type]);
        return this.format(logs);
    }
    format(logs) {
        let result = [];
        for(let  i = 0; i < logs.length; i++) {
            let time = new Date(logs[i].time).getTime();
            let key = Time.getYMD(time);
            result.push({
                name: key,
                value: logs[i].total
            });    
        } 
        return result;   
    }
}

module.exports = LogService;

