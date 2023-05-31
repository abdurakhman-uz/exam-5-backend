import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
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

let Users = mongoose.model("Users", userSchema)
export default Users;