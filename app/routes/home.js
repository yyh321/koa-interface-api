
const Router = require('koa-router')
const {home,upload} = require('../controllers/home')

const router = new Router()


router.get('/', home)
// 文件上传
router.post('/upload',upload)


module.exports = router




