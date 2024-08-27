import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Map, of: Number, default: {} },
    deleted: { type: Boolean, default: false }
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
