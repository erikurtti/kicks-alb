import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { assets, url } from '../../assets/assets';
import './Users.css';

const User = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${url}/api/user/list`);
            if (response.data.success) {
                setUsers(response.data.data);
                setFilteredUsers(response.data.data);
            } else {
                toast.error("Error fetching users");
            }
        } catch (error) {
            toast.error("Error fetching users");
        }
    };

    const filterUsers = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = users.filter(user =>
            user.name.toLowerCase().startsWith(lowercasedQuery)
        );
        setFilteredUsers(filtered);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        filterUsers(query);
    };

    const confirmDelete = (userId) => {
        setUserToDelete(userId);
        setShowConfirmation(true);
    };

    const cancelDelete = () => {
        setUserToDelete(null);
        setShowConfirmation(false);
    };

    const removeUser = async () => {
        try {
            const response = await axios.post(`${url}/api/user/remove`, { id: userToDelete });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchUsers();
            } else {
                toast.error("Error removing user");
            }
        } catch (error) {
            toast.error("Error removing user");
        }
        cancelDelete();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className='user-list flex-col'>
            <p>All Users List</p>
            <div className="search-container">
                <input
                    type='text'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder='Search by name...'
                    className='search-bar'
                />
                <FaSearch className='search-icon' />
            </div>
            <div className='user-table'>
                <div className="user-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Email</b>
                    <b>Action</b>
                </div>
                {filteredUsers.map((user, index) => (
                    <div key={index} className='user-table-format'>
                        <img src={assets.profile_image} className='clients-pfp' alt='User Profile' />
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                        <p className='cursor' onClick={() => confirmDelete(user._id)}>Remove</p>
                    </div>
                ))}
            </div>

            {showConfirmation && (
                <div className='confirmation-dialog'>
                    <p className='confirmation-p'>Are you sure you want to delete this user?</p>
                    <button className='confirm-btn' onClick={removeUser}>Confirm</button>
                    <button className='cancel-btn' onClick={cancelDelete}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default User;
