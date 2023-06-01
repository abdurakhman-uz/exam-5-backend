import Users from "../schemas/users.js"
import flurix from "flurix"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Wishlist from "../schemas/wishlist.js"
import Savat from "../schemas/savat.js"
dotenv.config()


export const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await Users.find({ username })

        if (!user.length > 0) {
            return res.status(404).json({ err: true, msg: "User not found" })
        }

        const pass = flurix.checkPassword(password, user[0].password)
        if (!pass) {
            return res.status(400).json({ err: true, msg: "Invalid password" })
        }

        return res.status(200).send({
            err: false,
            token: jwt.sign(
                {
                    id: user[0]._id,
                    username: user[0].username
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: `${process.env.JWT_EXPERIED}`
                })
        })
    } catch (error) {
        res.status(500).json({ err: true, msg: error.message })
    }
}

export const register = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await Users.find({ username })
        if (user.username === username) {
            return res.status(200).send({
                err: true,
                msg: "Username already exists"
            })
        }

        const pass = flurix.hashPassword(password)
        let newUser = await Users({ username: username, password: pass });
        await newUser.save();
        return res.status(200).send({
            err: false,
            msg: "User created"
        })
    } catch (error) {
        return res.status(500).send({
            err: true,
            msg: error.message
        })
    }
}

export const update = async (req, res) => {
    const user_id = req.user.id
    const { username, password } = req.body
    try {
        const hashPassword = flurix.hashPassword(password)
        const oldUser = await Users.findById({ _id: user_id })

        const user = await Users.findByIdAndUpdate({ _id: user_id }, {
            username: username ? username : oldUser.username,
            password: password ? hashPassword : oldUser.password
        })
        return res.status(200).send({
            err: false,
            msg: "User updated"
        })

    } catch (error) {
        return res.status(500).send({
            err: true,
            msg: error.message
        })

    }
}

export const admin = async (req, res) => {
    try {
        const user = req.user
        const findUser = await Users.findOne({ _id: user.id })
        if (findUser.role !== "admin") {
            return res.status(401).json({ err: true, msg: "Unauthorized" })
        }
        return res.status(200).send({
            err: false,
            admin: true
        })
    } catch (error) {
        return res.status(500).json({ err: true, msg: error.message })
    }
}

export const wishlist = async (req, res) => {
    try {

        if (req.headers.token) {
            const token = req.headers.token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const wishlists = await Wishlist.findOne({ name: decoded.username })
            let wishs = wishlists.products
            const { product_id } = req.body
            const newWishs = wishs.push(product_id)
            const wishlist = await Wishlist({ user: decoded.id, products: newWishs })

        }

        return res.status(401).json({ err: true, msg: "Unauthorized" })
    }
    catch (error) {
        res.status(500).json({ err: true, msg: error.message })
    }
}

export const getWishlist = async (req, res) => {
    try {

        if (req.headers.token) {
            const token = req.headers.token
            const decoded = jwt.verify(token, import.meta.env.JWT_SECRET)
            const wishlists = await Wishlist.findOne({ _id: decoded.id })
            if (!wishlists.length > 0) {
                return res.status(404).json({ message: "User not found" })
            }
            return res.status(200).send({
                err: false,
                wishlist: wishlists
            })
        }

        return res.status(401).json({ err: true, msg: "Unauthorized" })
    }
    catch (error) {
        res.status(500).json({ err: true, msg: error.message })
    }
}

export const savat = async (req, res) => {
    try {

        if (req.headers.token) {
            const token = req.headers.token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const wishlistsFind = await Savat.findOne({ username: decoded.username, })
            const { product_id } = req.body
            let wishs = wishlistsFind.products ? wishlistsFind.products : []
            const newWishs = wishs.push(product_id)
            const wishlists = await Savat.findOneAndUpdate({ username: decoded.username, user_id: decoded.id, products: wishs })
            wishlists.save()
            return res.status(200).send({
                err: false,
                msg: "Added to Savat"
            })
        }

        return res.status(401).json({ err: true, msg: "Unauthorized" })
    }
    catch (error) {
        res.status(500).json({ err: true, msg: error.message })
    }
}

export const userInfo = async (req, res) => {
    try {
        if (req.user) {
            const user = await Users.findOne({ _id: req.user.id })
            return res.status(200).send({
                err: false,
                user: user
            })
        }

        return res.status(401).json({ err: true, msg: "Unauthorized" })
    }
    catch (error) {
        res.status(500).json({ err: true, msg: error.message })
    }
}