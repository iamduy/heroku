import Blog from '../models/blog'
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'

export const create = (req, res) => {

    const blog = new Blog(req.body);
    blog.save((err, blog) => {
        if (err) {
            res.json({
                error: "Thêm blog thất bại"
            })
        }
        res.json(blog);
    });

}

export const list = (req, res) => {
    Blog.find((err, blog) => {
        if (err) {
            res.status(400).json({
                error: 'Not found blog'
            })
        }
        res.json(blog);
    })
}

export const blogById = (req, res, next, id) => {
    Blog.findById(id).exec((err, blog) => {
        if (err || !blog) {
            res.status(400).json({
                error: 'Không tìm thấy blog'
            })
        }
        req.blog = blog;
        next();
    })
}

export const read = (req, res) => {
    return res.json(req.blog);
}

export const update = (req, res) => {

    let blog = req.blog;
    blog.title = req.body.title;
    blog.photo = req.body.photo;
    blog.content = req.body.content;

    blog.save((err, data) => {
        if (err || !data) {
            return res.status(400).json({
                error: "Không sửa được sản phẩm"
            })
        }
        res.json(data);
    });
}

export const remove = (req, res) => {
    let blog = req.blog;
    blog.remove((err, deleteBlog) => {
        if (err) {
            return res.status(400).json({
                error: 'Không xóa được sản phẩm'
            })
        }
        res.json({
            blog: deleteBlog,
            message: "Xóa thành công"
        })
    })
}