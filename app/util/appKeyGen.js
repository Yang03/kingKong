const genKey = (appId) => {
    const now = Math.floor((Date.now()/1000))
    const time = str_split(now.toString(2).padStart(32, 0), 8)
    const id = str_split(appId.toString(2).padStart(32, 0),8)
    const append = randomStr(7)
    let arr = [time[0], id[1], time[2], id[0], time[1], id[2], time[3], id[3]]
    return arr.map( number => parseInt(number, 2).toString(16).padStart(2,0)).join('') + append
}

const randomStr = (len = 6) => {
    let text = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function str_split (string, splitLength) {
    if (splitLength === null) {
      splitLength = 1
    }
    if (string === null || splitLength < 1) {
      return false
    }
    string += ''
    let chunks = []
    let pos = 0
    let len = string.length
    while (pos < len) {
      chunks.push(string.slice(pos, pos += splitLength))
    }
    return chunks
}

//[].reduce.call(str, (g, c) => ((g.length + 1) % (8 + 1) ? (g + c) : (g + c + ' ')), ' ').split(' ').filter(s => s)

module.exports = {
    genKey: genKey
}