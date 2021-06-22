import Order from '../models/order'
import _ from 'lodash'

export const create = (req, res) => {
    let order = new Order(req.body);
    order.save((err, data) => {
        if (err) {
            res.status(400).json({
                error: 'Add to order failed !'
            })
        }
        res.json(data);
    })
}
export const orderId = (req, res, next, id) => {
    Order.findById(id).exec((err, order) => {
        if (err) {
            res.status(400).json({
                error: 'Not found order !'
            })
        }
        req.order = order;
        next();
    })
}

export const read = (req, res) => {
    return res.json(req.order);
}

export const remove = (req, res) => {
    let order = req.order;
    order.remove((err, removeOrder) => {
        if (err) {
            res.status(400).json({
                error: "Can't remove order"
            })
        }
        res.json({
            removeOrder,
            message: 'Remove success'
        })
    })
}

export const list = (req, res) => {
    Order.find((err, data) => {
        if (err) {
            res.status(400).json({
                error: 'Order not found'
            })
        }
        res.json(data);
    })
}