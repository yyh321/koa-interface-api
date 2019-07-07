const Router = require('koa-router')
const { topic, create, find, findById, update, deleteUser} = require('../controllers/users')

const router = new Router({prefix: '/user'})

router.get('/topic', topic)

router.get('/findAll', find)

router.get('/findUser/:id', findById)

router.post('/create', create)
router.put('/update/:id', update)
router.delete('/delete/:id', deleteUser)


module.exports = router






