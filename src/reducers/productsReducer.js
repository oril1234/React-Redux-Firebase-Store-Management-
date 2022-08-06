import {
  LOAD_PRODUCTS_DATA,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../constants/productsConstants"

//Redux products reducer by which products data fetched updated or deleted
export const productsReducer =
     (state = { products: []}, action) => {
    
  switch(action.type)
  {
      case LOAD_PRODUCTS_DATA :
          return { ...state, products :action.payload}

         

      case ADD_PRODUCT :
          return { ...state, products : [...state.products, action.payload]}

      case UPDATE_PRODUCT:
          let arr = [...state.products]
          let index = arr.findIndex(x => x.id === action.payload.id);
          if(index >= 0)
          {
              arr[index] = action.payload;
          }
          return { ...state, products : arr}


      case DELETE_PRODUCT:
              let arr2 = [...state.products]
              let index2 = arr2.findIndex(x => x.id === action.payload);
              if(index2 >= 0)
              {
                  arr2.splice(index2,1)
              }
              return { ...state, products : arr2}

      default:
          return {...state};
        }
}
