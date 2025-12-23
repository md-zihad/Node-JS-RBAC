const router = require('express').Router();


router.get('/admin', (req, res) => {
    res.json({
        message: 'This is ADMIN'
    })
})

router.get('/manager', (req, res) => {
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