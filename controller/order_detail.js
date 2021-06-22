import OrderDetail from '../models/order_detail'
import formidable from 'formidable'
import _ from 'lodash'

export const create = (req, res) => {
    let order_detail = new OrderDetail(req.body);
    order_detail.save((err, data) => {
        if (err) {
            res.status(400).json({
                error: 'Add failed !'
            })
        }
        res.json(data);
    })
}
export const list = (req, res) => {
    OrderDetail.find((err, data) => {
        if (err) {
            res.status(400).json({
                error: 'not found order detail'
            })
        }
        res.json(data);
    })
}
export const OrderDetailId = (req, res, next, id_order) => {
    OrderDetail.find({ id_order: id_order }).exec((err, order_detail) => {
        if (err) {
            res.status(400).json({
                error: "not found order detail with id order"
            })
        }
        req.order_detail = order_detail;
        next();
    })
}
export const read = (req, res) => {
    return res.json(req.order_detail);
}
