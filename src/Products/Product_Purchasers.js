//Component of the purchasers of a specific product

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Buy_Product_Comp from "./Buy_Product"

export default function Product_Purchasers_Comp(props)
{
    
    //Purchases data from redux reducer
    const purchsesReducerData=useSelector(state=>state.purchasesReducer)

    //Customers data from redux reducer
    const customersReducerData=useSelector(state=>state.customersReducer)

    //The product that was purchased
    const [product,setProduct]=useState()

    //If true region of buying a product is displayed
    const [showBuyPruductRegion,setShowBuyPruductRegion]=useState(false)

    //Hook to navigate to other pages
    const navigate=useNavigate()
    
    
    useEffect(()=>
    {
        /*Displaying buy product region only if father component of this componet
          is product component
        */
        setShowBuyPruductRegion(props.source=='Product_Comp'?true:false)
    },[props])

    useEffect(()=>
    {
        setProduct({...props.productData})
    },[props])


    //Invoked when navigating to edit customer
    const goToEditCustomer=(customer)=>
    {
        /*Storing id of selected customer who purchased the product
         in a session storage
        */ 
        sessionStorage['current_customer_id']=customer.id

        //Navigating to to editing the data of the customer who bought this product
        navigate('/edit_customer')
    }


    return(
        <React.Fragment>
            <ul>
                 {
                    product!=undefined &&
                    purchsesReducerData.purchases.map(purchase=>
                    {
  
                       let customer=customersReducerData.customers.find(
                       cust=>cust.id==purchase.customerID
                       )
                       if(purchase.productID==product.id)
                        return <li
                                key={purchase.id}
                                >
                                 <label
                                     style={{cursor:'pointer'}}
                                     onClick={()=>goToEditCustomer(customer)}
                                    >{customer.firstName+" "+customer.lastName+", "
                                        +purchase.date}</label>
                                        {   showBuyPruductRegion &&
                                            <Buy_Product_Comp
                                                customerData={customer}/>
                                        }
                                        
                                </li>
                    }

                        )
                 }

            </ul>
        </React.Fragment>
    )
}