
//Component of buying product region
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPurchase } from "../actions/purchasesActions";

export default function  Buy_Product_Comp(props)
{

    //The buyer of the product
    const [customer,setCustomer]=useState({})

    //Products data from reducer
    const productsReducerData=useSelector(state=>state.productsReducer)

    //Product that was selected from drompdown
    const [selectedProduct,setSelectedProduct]=useState()

    //True if a user clicked button of 'Buy Product'
    const [buyProductButtonClicked,setBuyProductButtonClicked]=useState(false)
    
    //Hook for dispatching action of buying a product to redux
    const dispatch=useDispatch()

    useEffect(()=>
    {
        //Loading the data of the purchaser of the product
        setCustomer(props.customerData)
    },[customer])


    //Invoked when user confirms buying a new product
    const handleSave=()=>
    {
        dispatch(addPurchase(customer.id,
            selectedProduct.id))
        setBuyProductButtonClicked(false);    
    }


    return(
        <div>
            <div> 
                <input type="button" 
                    value={!buyProductButtonClicked?"Buy Product":"Cancel"}
                    onClick={()=>{setBuyProductButtonClicked(!buyProductButtonClicked)}}/>
            </div>
            
            {
                buyProductButtonClicked &&
                productsReducerData.products!=undefined &&
                
                <div>
                    {/**Dropdown to select product to but */}
                    <select 
                        onChange=
                        {(e)=>
                            {
                                let foundProduct=
                                productsReducerData.products.find(prod=>
                                    prod.name==e.target.value);
                                setSelectedProduct(foundProduct)
                            }
                        }>
                        <option>Choose A Product</option>
                        {
                        
                            productsReducerData.products.map(product=>
                            {
                                return <option key={product.id} value={product.name}>{product.name}</option>
                            }

                            )
                        }
                    </select>

                    {/**Button to save a purchased product */}
                    <input type="button" value="Save"
                        disabled={selectedProduct==undefined}
                        onClick=
                        {
                            ()=>
                            {
                                handleSave()

                            }
                        }/>
                </div>
            }
        </div>
    
    )
}