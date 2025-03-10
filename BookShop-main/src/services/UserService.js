import axios from "axios"

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)
    return res.data
}

export const signupUser = async (data) => {
    try {
        console.log('API URL:', process.env.REACT_APP_API_URL);
        console.log('Signup data being sent:', data);
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data);
        console.log('Signup response:', res.data);
        return res.data;
    } catch (error) {
        console.error('Signup error:', error.response?.data || error);
        throw error;
    }
}

export const getDetailUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    });
    return res.data;
};
export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
        withCredentials: true
    })
    return res.data;
};
export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
    return res.data
};
export const updateUser = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data);
    return res.data
};

export const getAllUsers = async () => {
    try {
        const access_token = localStorage.getItem('access_token')
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/getAll`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        })
        console.log('Raw response from getAllUsers:', res);
        return {
            status: res.data.status,
            data: res.data.data || [] // Ensure we always return an array
        }
    } catch (error) {
        console.error('Error in getAllUsers:', error)
        throw error
    }
}

export const deleteUser = async (id) => {
    try {
        const access_token = localStorage.getItem('access_token')
        if (!access_token) {
            throw new Error('No access token found')
        }

        const apiUrl = process.env.REACT_APP_API_URL
        if (!apiUrl) {
            throw new Error('API URL not configured')
        }

        // Log delete request details
        console.log('Deleting user with ID:', id)
        console.log('Making delete request to:', `${apiUrl}/user/delete-user/${id}`)

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        }

        console.log('Delete request config:', config)

        const res = await axios.delete(`${apiUrl}/user/delete-user/${id}`, config)

        // Log response
        console.log('Delete response:', res.data)

        if (res.data.status === 'ERR') {
            throw new Error(res.data.message || 'Failed to delete user')
        }

        return res.data
    } catch (error) {
        console.error('Delete error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            requestUrl: error.config?.url,
            requestHeaders: error.config?.headers
        })
        throw error.response?.data || error
    }
}