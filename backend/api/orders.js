import { listOrders, placeOrder, placeOrderCod, updateStatus, userOrders, verifyOrder } from '../../controllers/orderController';
import authMiddleware from '../../middleware/auth';

export default async function handler(req, res) {
    try {
        // Apply authentication middleware for specific routes
        if (['/api/orders/userorders', '/api/orders/place', '/api/orders/placecod'].includes(req.url)) {
            await new Promise((resolve, reject) => {
                authMiddleware(req, res, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        }

        // Handle different routes based on the request URL
        switch (req.url) {
            case '/api/orders/list':
                if (req.method === 'GET') {
                    await listOrders(req, res);
                } else {
                    res.setHeader('Allow', ['GET']);
                    res.status(405).end(`Method ${req.method} Not Allowed`);
                }
                break;

            case '/api/orders/userorders':
                if (req.method === 'POST') {
                    await userOrders(req, res);
                } else {
                    res.setHeader('Allow', ['POST']);
                    res.status(405).end(`Method ${req.method} Not Allowed`);
                }
                break;

            case '/api/orders/place':
                if (req.method === 'POST') {
                    await placeOrder(req, res);
                } else {
                    res.setHeader('Allow', ['POST']);
                    res.status(405).end(`Method ${req.method} Not Allowed`);
                }
                break;

            case '/api/orders/status':
                if (req.method === 'POST') {
                    await updateStatus(req, res);
                } else {
                    res.setHeader('Allow', ['POST']);
                    res.status(405).end(`Method ${req.method} Not Allowed`);
                }
                break;

            case '/api/orders/verify':
                if (req.method === 'POST') {
                    await verifyOrder(req, res);
                } else {
                    res.setHeader('Allow', ['POST']);
                    res.status(405).end(`Method ${req.method} Not Allowed`);
                }
                break;

            case '/api/orders/placecod':
                if (req.method === 'POST') {
                    await placeOrderCod(req, res);
                } else {
                    res.setHeader('Allow', ['POST']);
                    res.status(405).end(`Method ${req.method} Not Allowed`);
                }
                break;

            default:
                res.status(404).json({ error: 'Route not found' });
                break;
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
