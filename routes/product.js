import express from 'express'

const router = express.Router();

router.get('/products', (req, res) => {

    res.send('<h1>Đây là trang Product</h1>');
    // res.json({
    //     message : "sucessfully"
    // })

});

module.exports = router;