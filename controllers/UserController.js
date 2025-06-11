const User = require('../models/User');
const {validationResult} = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        })
    }
    try {
        const def = {
            username: "timInova",
            password: "$2a$12$fXAq2NeejaVIR21N/FBOqO516XEEGQsGqSsniJt6H5IHdZUIPRypS"
        }
        const exp = process.env.EXPIRE_MINS || 10
        const par_user = req.body.username, par_pass = req.body.password
        if (par_user === def.username) {
            let check_pass = await bcrypt.compare(par_pass, def.password);
            if (check_pass) {
                const isian = {
                    username: par_user,
                }
                const token = jwt.sign(isian, process.env.TOKEN_SECRET, {expiresIn: exp + "m"});
                const data = {
                    token: token,
                    username: req.body.username
                }
                return res.status(200).send({
                    success: true,
                    message: "Login berhasil",
                    data: data,
                });
            }
        }
        return res.status(401).send({
            success: false,
            message: "Username atau password salah",
        })
    } catch (e) {
        if (e.message) {
            return res.status(400).send({
                success: false,
                message: e.message,
            })
        } else {
            console.log(e);
            return res.status(500).send({
                success: false,
                message: "Internal server error",
                errors: e
            })
        }
    }
}

const allUsers = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || null;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Token tidak ditemukan",
            })
        }
        jwt.verify(token, process.env.TOKEN_SECRET);
        const {limit, offset} = req.params
        const user = await User.find().skip(offset).limit(limit);
        return res.status(200).send({
            success: true,
            message: "Berhasil mengambil data",
            data: user
        })
    } catch (e) {
        if (["JsonWebTokenError", "TokenExpiredError"].includes(e.name)) {
            return res.status(401).send({
                success: false,
                message: e.message,
                errors: e
            })
        }
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            errors: e
        })
    }
}
const createUser = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1] || null;
    if (!token) {
        return res.status(401).send({
            success: false,
            message: "Token tidak ditemukan",
        })
    }
    jwt.verify(token, process.env.TOKEN_SECRET);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        })
    }
    try {
        const user = await User.create([{
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            status: req.body.status,
        }])
        return res.status(200).send({
            success: true,
            message: "Berhasil menambah data",
            data: user,
        });
    } catch (e) {
        if (["JsonWebTokenError", "TokenExpiredError"].includes(e.name)) {
            return res.status(401).send({
                success: false,
                message: e.message,
                errors: e
            })
        }
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            errors: e
        })
    }
}
const updateUser = async (req, res) => {
    const {id} = req.params;
    const token = req.headers.authorization?.split(" ")[1] || null;
    if (!token) {
        return res.status(401).send({
            success: false,
            message: "Token tidak ditemukan",
        })
    }
    jwt.verify(token, process.env.TOKEN_SECRET);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        })
    }
    try {
        const ada = await User.findById(id)
        if (!ada) {
            return res.status(400).send({
                success: false,
                message: "User tidak ditemukan",
            })
        }
        const user = await User.findByIdAndUpdate(id, {
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            status: req.body.status,
        }, {new: true})
        return res.status(200).send({
            success: true,
            message: "Berhasil mengedit data",
            data: user,
        });
    } catch (e) {
        if (["JsonWebTokenError", "TokenExpiredError"].includes(e.name)) {
            return res.status(401).send({
                success: false,
                message: e.message,
                errors: e
            })
        }
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            errors: e
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const token = req.headers.authorization?.split(" ")[1] || null;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Token tidak ditemukan",
            })
        }
        jwt.verify(token, process.env.TOKEN_SECRET);
        let user = await User.findById(id)
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User tidak ditemukan",
            })
        }
        // await User.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: "Berhasil menghapus data",
            data: {"id": id}
        });
    } catch (e) {
        if (["JsonWebTokenError", "TokenExpiredError"].includes(e.name)) {
            return res.status(401).send({
                success: false,
                message: e.message,
                errors: e
            })
        }
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            errors: e
        })
    }
}
const detailUser = async (req, res) => {
    const {id} = req.params;
    try {
        const token = req.headers.authorization?.split(" ")[1] || null;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Token tidak ditemukan",
            })
        }
        jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(id)
        return res.status(200).send({
            success: true,
            message: "Get data berhasil",
            data: user,
        });
    } catch (e) {
        if (["JsonWebTokenError", "TokenExpiredError"].includes(e.name)) {
            return res.status(401).send({
                success: false,
                message: e.message,
                errors: e
            })
        }
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            errors: e
        })
    }
}

module.exports = {allUsers, createUser, updateUser, deleteUser, detailUser, loginUser}