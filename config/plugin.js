
exports.mysql = {
    enable: true,
    package: 'egg-mysql',
};

exports.session = {
    key: 'kingkong',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
};

// exports.security = {
//     // csp: {
//     //   ignore: '/api'
//     // }
//     domainWhiteList: ['http://localhost:8080', 'http://localhost:7001']
// };