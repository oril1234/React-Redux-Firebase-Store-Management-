//This file handles redux actions related to customers
import { collection, getDocs, doc,deleteDoc, updateDoc } from 'firebase/firestore'
import db from '../firebaseApp'
import {  
          DELETE_CUSTOMER,
          LOAD_CUSTOMERS_DATA,
          UPDATE_CUSTOMER } 
          from '../constants/customersConstants'
import { deleteCustomerPurchases, deleteProductPurchases } from './purchasesActions'

         
//This method fetches all customers data from server and updating redux with it
export const fetchCustomers = () => async (dispatch) => 
{
  let customers = []

  //This method fetches customers data from server
  async function getCustomers(db) {
    const customersCol = collection(db, 'customers')
    const customersSnapshot = await getDocs(customersCol )
    const customersList = customersSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    return customersList
  }
  customers = await getCustomers(db)

  //Updating redux reducer with the data fetched from the server
  dispatch({ type: LOAD_CUSTOMERS_DATA, payload: customers })

}

//This method updates the data of a pecific customer in redux and in the sever
export const updateCustomer=(customer) => async (dispatch) => 
{
  let customer_ref=doc(db,"customers",customer.id)
  await updateDoc(customer_ref,{
    firstName:customer.firstName,
    lastName:customer.lastName,
    city:customer.city
  })

  //Updating customer details in redux
  dispatch({type:UPDATE_CUSTOMER,payload:customer})  
  
}

//This method deletes a customer date from redux and server
export const deleteCustomer=(customer) => async (dispatch) => 
{

  //First deleting customer purchases
  dispatch(deleteCustomerPurchases(customer.id))

  //De;eting customer from server
  await deleteDoc(doc(db,"customers",customer.id))

  //Deleting customer from redux
  dispatch({type:DELETE_CUSTOMER,payload:customer.id})

}
