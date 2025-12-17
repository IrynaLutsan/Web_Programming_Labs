//щновлення стану додатка
import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ONE_FROM_CART } from './actions';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload], //додавання в масив
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        //Залишається у новому списку тільки ті товари, ID яких не дорівнює тому, що ми хочемо видалити
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),  
      };

    case REMOVE_ONE_FROM_CART: { 
        // Шукаємо ІНДЕКС (номер у списку) першого товару з таким ID
      const index = state.cartItems.findIndex(item => item.id === action.payload);
      
      if (index !== -1) {
        const newCartItems = [...state.cartItems];
        newCartItems.splice(index, 1);
        
        return {
          ...state,
          cartItems: newCartItems,
        };
      }
      return state;
    } 

    default:
      return state; 
  }
};

export default cartReducer;