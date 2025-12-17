import { createStore } from 'redux';
import cartReducer from './reducers';

// Створюємо сховище, передаючи йому наш ред'юсер, який буде казати сховищу, як змінювати дані
const store = createStore(cartReducer);

export default store;