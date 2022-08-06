//This file handles redux actions related to Purchade made by customers
import { ADD_PURCHASE,
    DELETE_CUSTOMER_PURCHASES,
    DELETE_PRODUCT_PURCHASES, LOAD_PURCHASES_DATA } 
    from '../constants/purchasesConstants'
import { collection, getDocs, doc,addDoc, deleteDoc,query, where } 
    from 'firebase/firestore'
import db from '../firebaseApp'


//This method fetches all purchases data from server and updating redux with it
export const fetchPurchases = () => async (dispatch) => 
{
  let purchases=[]

  //Fetching from server purchases data
  async function getPurchases(db) {
    let purchasesCol=collection(db, 'purchases')
    const purchasesSnapshot = await getDocs(purchasesCol )
    const purchasesList = purchasesSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    return purchasesList
  }
    purchases = await getPurchases(db)

    //Updating redux reducer with purchases data
    dispatch({ type: LOAD_PURCHASES_DATA, payload: purchases })

  
}

//This method adds a new purchase using the id's of customer and product
export const addPurchase = (customerID,productID) => async (dispatch) => 
{
  //Formatting the purchase date according to the pattern dd/mm/yyyy
  let today=new Date()
  let d=String(today.getDate())
  let m=String(today.getMonth()+1)
  let y=today.getFullYear()
  today=`${d}/${m}/${y}`

  let newPurchase={customerID:customerID,productID:productID,date:today}

  //Adding purchase to server
  await addDoc(collection(db,'purchases'),newPurchase)

  //Adding product to redux reducer
  dispatch({type:ADD_PURCHASE,payload:newPurchase})
  
}

//This method deletes all the purchases of a specific product
export const deleteProductPurchases=(productId) => async (dispatch) => 
{

  //Deleting purchases in redux reducer
  dispatch({type:DELETE_PRODUCT_PURCHASES,payload:productId})

  //deleting purchases from server
  let purchases_query = query(collection(db,'purchases'),where("productID","==",productId))
  let query_snapshot=await getDocs(purchases_query)
  query_snapshot.docs.map(element=>
    {
      deleteDoc(doc(db,"purchases",element.id))
    })

}

//Deleting all purchases made by a pecific customer
export const deleteCustomerPurchases=(customerId) => async (dispatch) => 
{
  //Deleting purchases from redux reducer
  dispatch({type:DELETE_CUSTOMER_PURCHASES,payload:customerId})

  //Deleting purchases from server
  let purchases_query = query(collection(db,'purchases'),where("customerID","==",customerId))
  let query_snapshot=await getDocs(purchases_query)
  query_snapshot.docs.map(element=>
    {
      deleteDoc(doc(db,"purchases",element.id))
    })

}

