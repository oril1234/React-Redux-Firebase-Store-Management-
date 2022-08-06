import {
    ADD_CUSTOMER,
  DELETE_CUSTOMER,
  LOAD_CUSTOMERS_DATA,
  UPDATE_CUSTOMER

} from "../constants/customersConstants"

//Redux customers reducer by which customers data ffetched updated or deleted
export const customersReducer = (state = { customers: [] }, action) => {
  switch(action.type)
  {
      case LOAD_CUSTOMERS_DATA :
          return { ...state, customers :action.payload}

      case ADD_CUSTOMER :
          return { ...state, customers : [...state.customers, action.payload]}

      case UPDATE_CUSTOMER:
          let arr = [...state.customers]
          let index = arr.findIndex(x => x.id === action.payload.id);
          if(index >= 0)
          {
              arr[index] = action.payload;
          }
          return { ...state, customers : arr}


      case DELETE_CUSTOMER:
              let arr2 = [...state.customers]
              let index2 = arr2.findIndex(x => x.id === action.payload);
              if(index2 >= 0)
              {
                  arr2.splice(index2,1)
              }
              return { ...state, customers : arr2}

      default:
          return state;
        }
}
