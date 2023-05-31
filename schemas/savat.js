import mongoose from "mongoose";

const savatSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
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


let Savat = mongoose.model("Savat", savatSchema)
export default Savat;