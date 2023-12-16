import axios from 'axios';

const API_URL = 'http://localhost:5120/api/Employee';

export const getEmployeeData = async () => {
    try {
    const response = await axios.get(API_URL);
    return response.data;
} catch (error) {
    console.error('Error fetching employee data:', error);
    throw error;
    }
};

export const getEmployeeById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching employee with id ${id}:`, error);
        throw error;
    }
}


export const updateEmployee = async (id, employeeData) => {
    try {
        const url = `${API_URL}?id=${id}`;
        await axios.put(url, employeeData);
    } catch (error) {
        console.error(`Error updating employee with id ${id}:`, error);
        throw error;
    }
};

export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        if (response.status === 200) {
        return true; // Успішне видалення
    }
        throw new Error(`Error deleting employee with id ${id}`);
    } catch (error) {
        console.error(`Error deleting employee with id ${id}:`, error);
        throw error;
    }
};


export const addEmployee = async (id, name, lastName, position) => {
    const url = 'http://localhost:5120/api/Employee';
    const data = {
        "id": id,
        "firstName": name,
        "lastName": lastName,
        "position": position
    };

    try {
        await axios.post(url, data);
      return true; // успішно додано
    } catch (error) {
        console.log(error);
      return false; // помилка під час додавання
    }
};