const { Router } = require('express');
const path = require('node:path');

const router = Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views/index.html'))
})

module.exports = router;