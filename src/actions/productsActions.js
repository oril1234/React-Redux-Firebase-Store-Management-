//This file handles redux actions related to products
import {
  LOAD_PRODUCTS_DATA,
  DELETE_PRODUCT,
  UPDATE_PRODUCT
} from '../constants/productsConstants'
import { collection, getDocs, doc, setDoc, getDoc, deleteDoc, updateDoc,addDoc,where,query } from 'firebase/firestore'
import db from '../firebaseApp'
import { deleteProductPurchases } from './purchasesActions'


//This method fetches all products data from server and updating redux with it
export const fetchProducts = () => async (dispatch) => 
{
  let products=[]

  //Fetching products data from server
  async function getProducts(db) {
    const productsCol = collection(db, 'products')
    const productsSnapshot = await getDocs(productsCol )
    const productsList = productsSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    return productsList
  }
    products = await getProducts(db)

    //Updating redux with the fetched products data
    dispatch({ type: LOAD_PRODUCTS_DATA, payload: products })

  
}

//This method updates product's data in redux reduer and server
export const updateProduct=(product) => async (dispatch) => 
{
  let product_ref=doc(db,"products",product.id)
  await updateDoc(product_ref,{
    name:product.name,
    price:product.price,
    quantity:product.quantity
  })
  dispatch({type:UPDATE_PRODUCT,payload:product})  
  
}

//This method deletes product's data from redux reducer and server
export const deleteProduct=(product) => async (dispatch) => 
{
  //First delete all purchases of the product
  dispatch(deleteProductPurchases(product.id))

  //Deleting product from server
  await deleteDoc(doc(db,"products",product.id))

  //Delete product from redux reducer
  dispatch({type:DELETE_PRODUCT,payload:product.id})

}
