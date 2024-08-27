import { addToCart, getCart, removeFromCart } from '../../controllers/cartController';
import authMiddleware from '../../middleware/auth';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Apply authentication middleware
            await new Promise((resolve, reject) => {
                authMiddleware(req, res, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            switch (req.url) {
                case '/api/cart/get':
                    await getCart(req, res);
                    break;
                case '/api/cart/add':
                    await addToCart(req, res);
                    break;
                case '/api/cart/remove':
                    await removeFromCart(req, res);
                    break;
                default:
                    res.status(404).json({ error: 'Route not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
