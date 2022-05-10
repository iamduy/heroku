import Category from '../models/category'
import _ from 'lodash'
import formidable from 'formidable'
import fs from 'fs'
export const create = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Thêm danh mục thất bại"
            })
        }

        let category = new Category(fields);
        category.photo.data = fs.readFileSync(files.photo.path);
        category.photo.contentType = files.photo.type;
        category.save((err, data) => {
            if (err) {
                res.json({
                    error: "Không thêm được danh mục"
                })
            }
            res.json(data);
        });
    });
}

export const list = (__, res) => {
    Category.find((err, data) => {
        if (err) {
            res.status(400).json({
                error: "Product is not exist!"
            })
        }
        res.json(data);
    })
}

// hien chi tiet san pham
export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(400).json({
                error: "Not found category!"
            })
        }
        req.category = category;
        next();
    })
}


export const read = (req, res) => {
    return res.json(req.category);
}

export const remove = (req, res) => {
    let category = req.category;
    category.remove((err, deleteCate) => {
        if (err) {
            return res.status(400).json({
                error: "Delete Failure!"
            })
        }
        res.json({ category: deleteCate, message: 'Delete success' })
    })
}

export const photo = (req, res, next) => {
    if (req.category.photo.data) {
        res.set("Content-Type", req.category.photo.contentType);
        return res.send(req.category.photo.data);
    }
    next();
}

export const update = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Update failure!"
            })
        }

        let category = req.category;
        category = _.assignIn(category, fields);
        if (Object.keys(files).length != 0) {
            category.photo.data = fs.readFileSync(files.photo.path);
            category.photo.contentType = files.photo.type;
        }
        category.save((err, data) => {
            if (err) {
                res.json({
                    error: "Update failure!"
                })
            }
            res.json(data);
        });
    });
}

