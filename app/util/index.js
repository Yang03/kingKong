module.exports = {
    time:{
        getYMD(time) {
            let temp = new Date(time);
            let month = temp.getMonth() + 1;
            let day =  temp.getDate();
            month = month < 10 ? ('0' + month) : month;
            day = day < 10 ? ('0' + day) : day;
            return temp.getFullYear().toString() + '-' + month + '-' +  day;   
        }
    }
}