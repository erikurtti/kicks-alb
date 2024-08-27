import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import { FiRefreshCcw } from 'react-icons/fi'; // Import the reload/refresh icon
import { toast } from 'react-toastify';
import { assets, url } from '../../assets/assets';
import './DeletedUsers.css';

const DeletedUsers = () => {
    const [deletedUsers, setDeletedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchDeletedUsers = async () => {
        try {
            const response = await axios.get(`${url}/api/user/deleted`);
            if (response.data.success) {
                setDeletedUsers(response.data.data);
            } else {
                toast.error(response.data.message || "Error fetching deleted users");
            }
        } catch (error) {
            toast.error(`Error fetching deleted users: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const restoreUser = async (userId) => {
        try {
            const response = await axios.post(`${url}/api/user/restore`, { id: userId });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchDeletedUsers();  // Refresh the list after restoring a user
            } else {
                toast.error("Error restoring user");
            }
        } catch (error) {
            toast.error("Error restoring user");
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        fetchDeletedUsers();
    }, []);

    const filteredUsers = deletedUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='user-list-2 flex-col'>
            <p>Deleted Users List</p>
            <div className="search-container-2">
                <input
                    type='text'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder='Search by name...'
                    className='search-bar-2'
                />
                <FaSearch className='search-icon-2' />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='user-table-2'>
                    <div className="user-table-format-2 title-2">
                        <b>Image</b>
                        <b>Name</b>
                        <b>Email</b>
                        <b>Action</b>
                    </div>
                    {filteredUsers.map((user, index) => (
                        <div key={index} className='user-table-format-2'>
                            <img src={assets.profile_image} className='clients-pfp-2' alt='User Profile' />
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p className='cursor-2' onClick={() => restoreUser(user._id)}>
                                <FiRefreshCcw className='restore-icon-2' size={20} />Restore
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeletedUsers;
