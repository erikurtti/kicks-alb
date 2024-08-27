export const fetchWithAuth = async (url, options) => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 401) {
        handleLogout(); // Handle logout if token is invalid
    }

    return response;
};

export const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
};
