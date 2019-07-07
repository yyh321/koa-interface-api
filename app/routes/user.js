const Router = require('koa-router')
const { topic, create, find, findById, update, deleteUser,login} = require('../controllers/users')

const router = new Router({prefix: '/user'})

router.get('/topic', topic)

router.get('/findAll', find)

router.get('/findUser/:id', findById)

router.post('/create', create)
router.patch('/update/:id', update)
router.delete('/delete/:id', deleteUser)
router.post('/login',login)


module.exports = router






