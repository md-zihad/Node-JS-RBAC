const router = require('express').Router();
const { authVerify } = require('../middlewares/authMiddleware')


router.get('/admin', authVerify, (req, res) => {
    res.json({
        message: 'This is ADMIN'
    })
})

router.get('/manager', authVerify, (req, res) => {
    res.json({
        message: 'This is MANAGER'
    })
})

router.get('/user', (req, res) => {
    res.json({
        message: 'This is USER'
    })
})

module.exports = router