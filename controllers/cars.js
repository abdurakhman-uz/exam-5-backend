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
        console.log(category, name, marka, tonirovka, motor, year, color, distance, gearbook, desc, price, cover, images, infoImage);
        if (!category || !name || !marka || !tonirovka || !motor || !year || !color || !distance || !gearbook || !desc || !price || !cover || !infoImage) {
            console.log(category, name, marka, tonirovka, motor, year, color, distance, gearbook, desc, price, cover, images, infoImage);
            return res.status(400).send({ err: true, msg: "All fields are required" })
        }
        const findCategory = await Models.find({ name: category })
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

export const update = async (req, res) => {
    try {
        const id = req.params.id
        const { name, marka, tonirovka, motor, year, color, distance, gearbook, desc, price, } = req.body
        const findCar = await Cars.findById({ _id: id })
        if (findCar) {
            const newCar = await Cars.findByIdAndUpdate({ _id: id }, {
                name: name ? name : findCar.name,
                marka: marka ? marka : findCar.marka,
                tonirovka: tonirovka ? tonirovka : findCar.tonirovka,
                motor: motor ? motor : findCar.motor,
                year: year ? year : findCar.year,
                color: color ? color : findCar.color,
                distance: distance ? distance : findCar.distance,
                gearbook: gearbook ? gearbook : findCar.gearbook,
                desc: desc ? desc : findCar.desc,
                price: price ? price : findCar.price,
            })
            return res.status(200).send({ ok: true, msg: "Update Successfully" })
        }

        return res.status(404).send({ err: true, msg: "Car not exists" })

    } catch (error) {
        return res.send({ err: true, msg: error.message })
    }
}

export const createCoverImage = (req, res) => {
    const file = req.file.filename
    try {
        if (file) return res.send({ err: false, file: file })
    } catch (error) {
        return res.status(500).send({ err: true, msg: error.message });
    }
}

export const deleted = async (req, res) => {
    try {
        const id = req.params.id
        const findCar = await Cars.findById({ _id: id })
        if (findCar) {
            const car = await Cars.findByIdAndDelete({ _id: id })
            return res.status(200).send({ ok: true, msg: "Delete Successfully" })
        }

        return res.status(404).send({ err: true, msg: "Car not exists" })

    } catch (error) {
        return res.send({ err: true, msg: error.message })
    }
}

export const allCars = async (req, res) => {
    try {

    } catch (error) {

    }
}

export const createImages = async (req, res) => {
    const files = req.files
    let filenames = []
    files.map(f => filenames.push(f.filename))
    try {
        console.log(filenames);
        if (files) return res.send({ err: false, msg: filenames })
    } catch (error) {

        return res.status(500).send({ err: true, msg: error.message });
    }
}

export const createImage = async (req, res) => {
    const file = req.file.filename
    try {
        if (file) return res.send({ err: false, file: file })
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