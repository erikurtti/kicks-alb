import formidable from 'formidable';
import fs from 'fs';
import { addShoe, listShoe, removeShoe } from '../controllers/shoeController.js';
import { uploadImageToStorage } from '../utils/storage.js'; // Ensure this function is implemented

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { action } = req.query;

        if (action === 'add') {
            const form = new formidable.IncomingForm();

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return res.status(500).json({ message: 'Error parsing form data' });
                }

                try {
                    const file = files.image[0];
                    const imageUrl = await uploadImageToStorage(file.path, file.originalFilename);

                    await addShoe({ ...fields, image: imageUrl }, res);

                    fs.unlinkSync(file.path); // Clean up local file if needed
                } catch (error) {
                    res.status(500).json({ message: 'Error processing file' });
                }
            });
        } else if (action === 'remove') {
            await removeShoe(req, res);
        } else {
            res.status(400).json({ message: 'Invalid action' });
        }
    } else if (req.method === 'GET') {
        await listShoe(req, res);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
