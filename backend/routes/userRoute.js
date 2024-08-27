// backend/routes/userRoutes.js
import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import userModel from '../models/userModel.js'; // Import your user model

const userRouter = express.Router();

// Register a new user
userRouter.post('/register', registerUser);

// Login a user
userRouter.post('/login', loginUser);

// List all non-deleted users
userRouter.get('/list', async (req, res) => {
    try {
        const users = await userModel.find({ deleted: { $ne: true } }, 'name email password'); // Fetch users who are not deleted
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
});

// Soft delete a user
userRouter.post('/remove', async (req, res) => {
    const { id } = req.body;
    try {
        await userModel.findByIdAndUpdate(id, { deleted: true });  // Soft delete user by setting `deleted` to true
        res.json({ success: true, message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing user' });
    }
});


// List all deleted users
userRouter.get('/deleted', async (req, res) => {
    try {
        const deletedUsers = await userModel.find({ deleted: true }, 'name email');
        res.json({ success: true, data: deletedUsers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching deleted users' });
    }
});


// Restore a deleted user
userRouter.post('/restore', async (req, res) => {
    const { id } = req.body;
    try {
        await userModel.findByIdAndUpdate(id, { deleted: false });  // Set `deleted` to false to restore user
        res.json({ success: true, message: 'User restored successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error restoring user' });
    }
});




export default userRouter;
