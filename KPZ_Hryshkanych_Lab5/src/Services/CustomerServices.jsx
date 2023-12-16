import axios from 'axios';

const API_URL = 'http://localhost:5120/api/Customer';

export const getCustomerData = async () => {
    try {
    const response = await axios.get(API_URL);
    return response.data;
} catch (error) {
    console.error('Error fetching customer data:', error);
    throw error;
    }
};

export const getCustomerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching customer with id ${id}:`, error);
        throw error;
    }
}


export const updateCustomer = async (id, customerData) => {
    try {
        const url = `${API_URL}?id=${id}`;
        await axios.put(url, customerData);
    } catch (error) {
        console.error(`Error updating customer with id ${id}:`, error);
        throw error;
    }
};

export const deleteCustomer = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        if (response.status === 200) {
        return true; // Успішне видалення
    }
        throw new Error(`Error deleting customer with id ${id}`);
    } catch (error) {
        console.error(`Error deleting customer with id ${id}:`, error);
        throw error;
    }
};


export const addCustomer = async (id, name, lastName, email, employeeId) => {
    const url = 'http://localhost:5120/api/Customer';
    const data = {
        "id": id,
        "firstName": name,
        "lastName": lastName,
        "email": email,
        "employeeID": employeeId
    };

    try {
        await axios.post(url, data);
      return true; // успішно додано
    } catch (error) {
        console.log(error);
      return false; // помилка під час додавання
    }
};