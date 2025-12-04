import axios from 'axios';

const BASE_URL = '/api/shoes';
const NEWS_URL = '/api/featured-news';

/**
 * 1. Отримати список взуття (з підтримкою фільтрів).
 * @param {object} [filters={}] - Об'єкт фільтрів (producer, color)
 * @returns {Promise<Array>}
 */
export async function fetchShoes(filters = {}) {
    // Axios автоматично перетворює об'єкт params на рядок запиту (?producer=Nike&color=black)
    const response = await axios.get(BASE_URL, {
        params: filters, 
    });
    return response.data; 
}

/**
 * 2. Отримати один товар за ID.
 * @param {number} id - ID товару.
 * @returns {Promise<object>}
 */
export async function fetchShoeById(id) {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
}

/**
 * 3. Створити новий товар (POST).
 * @param {object} shoeData - Дані нового товару.
 * @returns {Promise<object>}
 */
export async function createShoe(shoeData) {
    const response = await axios.post(BASE_URL, shoeData);
    return response.data;
}

/**
 * 4. Оновити існуючий товар (PUT).
 * @param {number} id - ID товару.
 * @param {object} shoeData - Дані для оновлення.
 * @returns {Promise<object>}
 */
export async function updateShoe(id, shoeData) {
    const response = await axios.put(`${BASE_URL}/${id}`, shoeData);
    return response.data;
}

/**
 * 5. Видалити товар за ID (DELETE).
 * @param {number} id - ID товару.
 * @returns {Promise<object>}
 */
export async function deleteShoe(id) {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
}

// --- Функції для Новин (FeaturedNews) ---

/**
 * 6. Отримати список новин (для HomePage).
 * @returns {Promise<Array>}
 */
export async function fetchFeaturedNews() {
    const response = await axios.get(NEWS_URL); 
    return response.data;
}