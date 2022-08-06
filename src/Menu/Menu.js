import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Routes, Route, Link} from 'react-router-dom'
import { fetchCustomers } from '../actions/customersActions'
import { fetchProducts } from '../actions/productsActions'
import { fetchPurchases } from '../actions/purchasesActions'
import Customers_Comp from '../Customers/Customers'
import Edit_Customer_Comp from '../Customers/Edit_Customer'
import Application_Bar_Comp from '../Head'
import Landing_Page_Comp from '../Landing_Page'
import Edit_Product_Comp from '../Products/Edit_Product'
import Products_Comp from '../Products/Products'
import Purchases_Comp from '../Purchases/Purchases'
export default function Menu_Comp()
{
    const dispatch=useDispatch()
    const state=useSelector(state=>state)
    useEffect(()=>
    {
        //Invoking the fetch of prducts from server
        if(state.productsReducer.products.length==0)
            dispatch(fetchProducts())
        
        //Invoking the fetch of custmers from server
        if(state.customersReducer.customers.length==0)
            dispatch(fetchCustomers())    
            
        //Invoking the fetch of purchases from server    
        if(state.purchasesReducer.purchases.length==0)  
            dispatch(fetchPurchases())
    },[]
        
    )
    return(
        <div>

            <Application_Bar_Comp />

            <Routes>
        
            <Route path="/" element={ <Landing_Page_Comp />  } />
            <Route path="/customers" element={ <Customers_Comp />  } />
            <Route path="/products" element={ <Products_Comp />  } />
            <Route path="/purchases" element={ <Purchases_Comp />  } />
            <Route path="/edit_product" element={ <Edit_Product_Comp />  } />
            <Route path="/edit_customer" element={ <Edit_Customer_Comp />  } />

            </Routes>

        </div>
    )
}