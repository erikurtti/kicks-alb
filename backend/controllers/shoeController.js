import fs from 'fs';
import shoeModel from "../models/shoeModel.js";

// Get all shoes
const listShoe = async (req, res) => {
    try {
        const shoes = await shoeModel.find({});
        res.json({ success: true, data: shoes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while fetching shoes" });
    }
}

// Add a new shoe
const addShoe = async (req, res) => {
    try {
        const image_filename = req.file.filename;

        const shoe = new shoeModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename,
            size: req.body.size // Ensure sizes are included in the request body if needed
        });

        await shoe.save();
        res.status(201).json({ success: true, message: "Shoe added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while adding the shoe" });
    }
}

// Delete a shoe
const removeShoe = async (req, res) => {
    try {
        const shoe = await shoeModel.findById(req.body.id);
        
        if (shoe) {
            fs.unlink(`uploads/${shoe.image}`, (err) => {
                if (err) console.error("Error deleting image:", err);
            });

            await shoeModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Shoe removed successfully" });
        } else {
            res.status(404).json({ success: false, message: "Shoe not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred while removing the shoe" });
    }
}

export { addShoe, listShoe, removeShoe };

