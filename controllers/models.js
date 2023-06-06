import Models from "../schemas/models.js"
import Cars from "../schemas/cars.js"
import fs from "fs"


export const get = async (req, res) => {
    try {
        const models = await Models.find({})
        return res.status(200).send({ ok: true, models })
    } catch (error) {
        return res.send({ err: true, msg: error.message })
    }
}

export const create = async (req, res) => {
    const { name, img } = req.body
    try {
        let newModel = await Models({ name: name, image: img });
        await newModel.save();
        return res.status(201).send({ ok: true, msg: "Create Successfully" })
    } catch (error) {
        return res.send({ err: true, msg: error.message })
    }
}

export const createImage = async (req, res) => {
    const fileName = req.file.filename
    try {
        return res.status(201).send({ ok: true, msg: "Upload Successfully", file: fileName })
    } catch (error) {
        const imagePath = `uploads/category/${fileName}`;
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image:', err);
            } else {
                console.log('Image deleted successfully');
            }
        })
        return res.send({ err: true, msg: error.message })
    }
}

export const getImages = async (req, res) => {
    try {
        const imageName = req.params.imageName;
        const imagePath = `uploads/category/${imageName}`;

        fs.readFile(imagePath, (err, data) => {
            if (err) {
                res.status(404).send('Image not found');
                return;
            }
            const fileExtension = imageName.split('.').pop();
            const contentType = `image/${fileExtension}`;
            res.set('Content-Type', contentType);
            res.send(data);
        });
    } catch (error) {
        return res.send({ err: true, msg: error.message })
    }
}

export const getCars = async (req, res) => {
    try {
        const model = await Models.findOne({ _id: req.params.category })
        const cars = await Cars.find({ category: model.name })
        return res.status(200).send({ ok: true, cars })
    } catch (error) {
        res.status(500).send({ err: true, msg: error.message })
    }
}

export const update = async (req, res) => {
    const { id } = req.params
    const { name, img } = req.body
    try {
        let model = await Models.findById({ _id: id })
        let newModel = await Models.findByIdAndUpdate({ _id: id }, {
            name: name? name : model.name,
        });
        return res.status(200).send({ ok: true, msg: "Update Successfully" })
    } catch (error) {
        return res.send({ err: true, msg: error.message })
    }
}