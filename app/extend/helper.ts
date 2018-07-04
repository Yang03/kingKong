//import path from 'path';
const path = require('path');
const fs = require("fs");

const dir = path.resolve(__dirname, '../public/asset/manifest.json');
const manifest = fs.readFileSync(dir);
//console.log()
module.exports = {
    getScript(param: any) {
        const json = JSON.parse(manifest.toString());
        const jsPath = json[param] 
        return `<script src="/public/${jsPath}"></script>`
    },
  };
  