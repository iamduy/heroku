import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>Đây là trang Home</h1>');
}); 

module.exports = router;