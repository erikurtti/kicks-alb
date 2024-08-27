import mongoose from "mongoose";

const shoeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },  // Use Number for price
    image: { type: String, required: true },
    category: { type: String, required: true },
});

const shoeModel = mongoose.models.shoe || mongoose.model("shoe", shoeSchema);
export default shoeModel;
