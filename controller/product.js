import Product from '../models/product'
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'

export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deleteProd) => {
        if (err) {
            return res.status(400).json({
                error: "Không xóa được sản phẩm"
            })
        }
        res.json({
            product: deleteProd,
            message: "Xóa thành công"
        })

    })
}


export const list = (req, res) => {
    Product.find((err, data) => {
        if (err) {
            error: "Không tìm thấy sản phẩm"
        }
        res.json(data);
    })
}



export const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error: "Không tìm thấy sản phẩm"
            })
        }
        req.product = product;
        next();
    })
}

export const read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

export const create = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Thêm sản phẩm thất bại"
            })
        }
        const { name, description, price, feature, quantity, category } = fields;
        if (!name || !description || !price || !feature || !quantity || !category) {
            return res.status(400).json({
                error: "Bạn cần nhập các trường bắt buộc"
            })
        }
        // 1kb = 1000
        // 1mb = 100000
        // check size anh
        // if (files.photo) {
        //     if (files.photo.size > 1000000) {
        //         res.status(400).json({
        //             error: "Bạn nên upload ảnh dưới 1mb"
        //         })
        //     }

        // }
        //them san pham 
        let product = new Product(fields);
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
        product.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Không thêm được sản phẩm"
                })
            }
            res.json(data);
        });
    });

}

export const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}
export const update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Sửa sản phẩm thất bại"
            })
        }
        const { name, description, price, feature, quantity, category } = fields;
        if (!name || !description || !price || !feature || !quantity || !category) {
            return res.status(400).json({
                error: "Bạn cần nhập các trường bắt buộc"
            })
        }
        let product = req.product;

        product = _.assignIn(product, fields);
        
        if (Object.keys(files).length != 0) {
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Không sửa được sản phẩm"
                })
            }
            res.json(data);
        });
    });
}



// export const create = (req, res) => {

//     //them san pham 
//     const product = new Product(req.body);
//     product.save((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 error: "Không thêm được sản phẩm"
//             })
//         }
//         res.json(data);
//     });
// }

// export const update = (req, res) => {

//     const product = req.product;
//     product.name = req.body.name;
//     product.description = req.body.description;
//     product.price = req.body.price;
//     product.photo = req.body.photo;
//     product.quantity = req.body.quantity;
//     product.status = req.body.status;
//     product.feature = req.body.feature;
//     product.category = req.body.category;

//     product.save((err, data) => {
//         if (err || !data) {
//             return res.status(400).json({
//                 error: "Không sửa được sản phẩm"
//             })
//         }
//         res.json(data);
//     });
// }