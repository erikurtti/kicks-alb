import { loginUser, registerUser } from '../controllers/userController.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { action } = req.query;

        if (action === 'login') {
            await loginUser(req, res);
        } else if (action === 'register') {
            await registerUser(req, res);
        } else {
            res.status(400).json({ message: 'Invalid action' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
