import Cars from "../schemas/cars.js"
import Models from "../schemas/models.js"
import fs from "fs"

export const get = async (req, res) => {
    try {
        const cars = await Cars.find({})
        return res.status(200).send({ ok: true, cars })
    } catch (error) {
        return res.send({ err: true, msg: error.message })
    }
}

export const create = async (req, res) => {
    try {
        const { category, name, marka, tonirovka, motor, year, color, distance, gearbook, desc, price, cover, images, infoImage } = req.body
        if (!category || !name || !marka || !tonirovka || !motor || !year || !color || !distance || !gearbook || !desc || !price || !cover || !images || !infoImage) {
            return res.status(400).send({ err: true, msg: "All fields are required" })
        }
        const findCategory = await Models.find({ name: category })
        console.log(findCategory);
        if (findCategory.length > 0) {
            const newCar = new Cars({
                name,
                marka,
                category,
                tonirovka,
                motor,
                year,
                color,
                distance,
                gearbook,
                desc,
                price,
                cover,
                images,
                infoImage
            })
            await newCar.save();
            return res.status(201).send({ ok: true, msg: "Create Successfully" })
        }

        return res.status(404).send({ err: true, msg: "Category not exists" })

    } catch (error) {
        return res.send({ err: true, msg: error.message })
    }
}

export const createImages = async (req, res) => {
    const files = req.files
    let filenames = []
    files.map(f => filenames.push(f.filename))
    try {
        if (files) return res.send({ err: false, msg: filenames })
    } catch (error) {

        return res.status(500).send({ err: true, msg: error.message });
    }
}

export const createImage = async (req, res) => {
    const file = req.file.filename
    try {
        if (file) return res.send({ err: false, msg: file })
    } catch (error) {
        return res.status(500).send({ err: true, msg: error.message });
    }
}

export const getCarImages = async (req, res) => {
    try {
        const imageName = req.params.imageName;
        const imagePath = `uploads/cars/${imageName}`;

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

export const getInfoCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Cars.find({ _id: id });
        return res.status(200).send({ ok: true, car })
    } catch (error) {
        return res.status(500).send({ err: true, msg: error.message })
    }
}