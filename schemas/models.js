import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
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


// module.exports = mongoose.models.Register || mongoose.model("Register", registerSchema);
// export default mongoose.model.User || mongoose.model("User", usersSchema);

let Models = mongoose.model("Models", modelSchema)
export default Models;