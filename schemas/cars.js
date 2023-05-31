import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    marka: {
        type: String,
        required: true,
    },
    tonirovka: {
        type: String,
        required: true,
    },
    motor: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    gearbook: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    infoImage: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        timezone: 'Asia/Tashkent',
        get: (createdAt) => moment(createdAt).format('YYYY-MM-DD'),
        // the "get" option formats the date value when retrieving it from the database
        format: 'YYYY-MM-DD', // the "format" option specifies the desired format
    },
});

let Cars = mongoose.model("Cars", carSchema)
export default Cars