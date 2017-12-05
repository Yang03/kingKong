const Time = require('../util').time;
const Service = require('egg').Service;

class LogService extends Service {
    async getTotalTime(startTime, endTime, userId, appId) {
        const query = "Select * From users_log Where userid = ? and appid = ? and DATE_FORMAT(time,'%Y-%m-%d') >= ? and DATE_FORMAT(time,'%Y-%m-%d') <= ? ";
        const logs = await this.app.mysql.query(query, [userId, appId, startTime, endTime]);
        //return logs;
        //logintype：1为登入，0为登出, 
        //有登入没登出， 登出23:59:59
        // 有登出没有登入 登入00:00:00
        // 连续两个登入 用第一个登入时间
        // 连续两个登出 用第尔个登出时间
        let result = {};
        for(let i = 0, len = logs.length; i < len; i++) {
            let log = logs[i];
            let temp = new Date(log.time);
            let current = Time.getYMD(temp);
            if (!result[current]) {
                result[current] = [];
            }
            result[current].push({
                logintype: log.logintype,
                time:  log.time
            })
        }
        const keys = Object.keys(result);
        const data = {};
        for (let key of keys) {
            data[key] = getTotalTime(result[key])
        }
        const keysObj = Object.keys(data);
        const res = [];
        for(let key of keysObj) {
        res.push({
            name: key,
            value: Math.round(data[key] / 1000 / 60),
            milliseconds: data[key]
            })
        }
        return res;
    }
}

function getTotalTime(logs) {
    let totalTime = 0;
    let front = [];
    let end = [];
    if (logs[0].logintype == 0) {
        front = [{ "logintype": 1, "time": new Date(current + ' 00:00:00').toLocaleString()}];
    }
    if (logs[logs.length - 1] == 1) {
        end = [{"logintype": 0, "time": new Date(current + ' 23:59:59').toLocaleString()}];
    }
    logs = front.concat(logs).concat(end);
    for(let i = 0; i < logs.length; i ++) {
        let start = new Date(new Date(logs[i].time).toLocaleString()).getTime();
        while (logs[i].logintype == 1) i ++;
        while (i + 1 < logs.length && logs[i+1].logintype != 1) i ++; 
        let end = new Date(new Date(logs[i].time).toLocaleString()).getTime();
        totalTime += (end - start);
    }
    return totalTime;
}

module.exports = LogService;

