import axios from "axios"
export const axiosJWT = axios.create()

export const getAllProducts = async (params) => {
    const { sort, filter } = params || {};
    let url = `${process.env.REACT_APP_API_URL}/product/getAll-Product`;

    // Add query parameters if they exist
    const queryParams = new URLSearchParams();

    // Handle sort parameter
    if (sort) {
        // Assuming sort is an array [order, field]
        if (Array.isArray(sort) && sort.length >= 2) {
            queryParams.append('sort', JSON.stringify(sort));
        }
    }

    // Handle filter parameter
    if (filter) {
        // Assuming filter is an array [field, value]
        if (Array.isArray(filter) && filter.length >= 2) {
            queryParams.append('filter', JSON.stringify(filter));
        }
    }

    // Append query string to URL if there are parameters
    const queryString = queryParams.toString();
    if (queryString) {
        url += `?${queryString}`;
    }

    const res = await axios.get(url);
    return res.data;
};

export const getDetailsProduct = async (id) => {
    try {
        console.log('Fetching product details for ID:', id);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getDetail-Product/${id}`);
        console.log('Product details response:', res.data);
        return res.data;
    } catch (error) {
        console.error('Get product details error:', {
            message: error.message,
            response: error.response?.data
        });
        throw error.response?.data || error;
    }
};

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
    return res.data

}

export const updateProduct = async (id, data) => {
    try {
        const accessToken = localStorage.getItem('access_token')
        if (!accessToken) {
            throw new Error('No access token found')
        }

        const apiUrl = process.env.REACT_APP_API_URL
        if (!apiUrl) {
            throw new Error('API URL not configured')
        }

        // Log input data
        console.log('Raw update input data:', data)

        // Xử lý dữ liệu theo yêu cầu của backend
        const processedData = {
            name: data.name?.trim(),
            type: data.type?.trim(),
            price: Number(data.price),
            description: data.description?.trim() || '',
            rating: Number(data.rating),
            image: data.image,
            countInStock: data.countInStock || 0,
            discount: data.discount || 0,
            author: data.author?.trim()
        }

        // Log processed data
        console.log('Processed update data:', processedData)

        // Validate theo yêu cầu của backend
        if (!processedData.name) throw new Error('Name is required')
        if (!processedData.type) throw new Error('Type is required')
        if (!processedData.price || isNaN(processedData.price)) throw new Error('Valid price is required')
        if (!processedData.description) throw new Error('Description is required')
        if (!processedData.image) throw new Error('Image is required')
        if (!processedData.rating || isNaN(processedData.rating)) throw new Error('Valid rating is required')

        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken)}`,
                'Content-Type': 'application/json'
            }
        }

        // Log request details
        console.log('Making update request to:', `${apiUrl}/product/update/${id}`)
        console.log('Update request config:', config)

        const res = await axios.put(`${apiUrl}/product/update/${id}`, processedData, config)

        // Log full response
        console.log('Full update response:', res)

        if (res.data.status === 'ERR') {
            throw new Error(res.data.message || 'Failed to update product')
        }

        return res.data
    } catch (error) {
        console.error('Update error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            requestData: error.config?.data,
            requestHeaders: error.config?.headers,
            requestUrl: error.config?.url
        })
        throw error.response?.data || error
    }
}

export const deleteProduct = async (id) => {
    try {
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            throw new Error('No access token found');
        }

        const apiUrl = process.env.REACT_APP_API_URL;
        if (!apiUrl) {
            throw new Error('API URL not configured');
        }

        // Log delete request details
        console.log('Deleting product with ID:', id);
        console.log('Making delete request to:', `${apiUrl}/product/delete-product/${id}`);

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        };

        console.log('Delete request config:', config);

        const res = await axios.delete(`${apiUrl}/product/delete-product/${id}`, config);

        // Log response
        console.log('Delete response:', res.data);

        if (res.data.status === 'ERR') {
            throw new Error(res.data.message || 'Failed to delete product');
        }

        return res.data;
    } catch (error) {
        console.error('Delete error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            requestUrl: error.config?.url,
            requestHeaders: error.config?.headers
        });
        throw error.response?.data || error;
    }
};