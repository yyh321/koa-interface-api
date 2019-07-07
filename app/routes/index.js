
const fs = require('fs')

module.exports = (app) => {

  fs.readdirSync(__dirname).forEach(file => {
    if(file === 'index.js') return;
    console.log(file)
    const router = require(`./${file}`)
    app.use(router.routes())


  });
}




