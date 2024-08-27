// src/services/userService.js (or a similar file)
import { clearUserData } from '../utils';

export async function removeUser(userId) {
    try {
        const response = await fetch('/api/users/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId }),
        });
        
        const result = await response.json();
        
        if (result.success) {
            clearUserData();
            window.location.href = '/login'; // Redirect to login page
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
