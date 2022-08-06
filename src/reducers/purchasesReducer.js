import {
  ADD_PURCHASE,
  DELETE_CUSTOMER_PURCHASES,
  DELETE_PRODUCT_PURCHASES,
  LOAD_PURCHASES_DATA,
  UPDATE_PURCHASE,
} from "../constants/purchasesConstants"

//Redux purchases reducer by which purchases data ffetched updated or deleted
export const purchasesReducer = (state = { purchases: [] }, action) => {
  switch(action.type)
  {
      case LOAD_PURCHASES_DATA :
          return { ...state, purchases :action.payload}

      case ADD_PURCHASE :
          return { ...state, purchases : [...state.purchases, action.payload]}

      case UPDATE_PURCHASE:
          let arr = [...state.purchases]
          let index = arr.findIndex(x => x.id === action.payload.id);
          if(index >= 0)
          {
              arr[index] = action.payload;
          }
          return { ...state, purchases : arr}

          
        case DELETE_PRODUCT_PURCHASES:
            let input_arr = [...state.purchases]
            let output_arr = [...input_arr.filter(purchase=>
            purchase.productID!=action.payload)]
            return { ...state, purchases : output_arr}
            
        case DELETE_CUSTOMER_PURCHASES:
            let input_arr1 = [...state.purchases]
            let output_arr1 = [...input_arr1.filter(purchase=>
                purchase.customertID!=action.payload)]
            return { ...state, purchases : output_arr1}
  
      default:
          return state;
        }
}
