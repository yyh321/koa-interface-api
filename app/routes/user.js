const Router = require('koa-router')
const {topic, create} = require('../controllers/users')

const router = new Router({prefix: '/user'})

router.get('/topic', topic)

router.post('/create', create)


module.exports = router






