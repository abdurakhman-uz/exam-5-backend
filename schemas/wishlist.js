import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    user: {
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


let Wishlist = mongoose.model("Wishlist", wishlistSchema)
export default Wishlist;