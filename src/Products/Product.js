
//Component of a product represented as a table row
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import Product_Purchasers_Comp from "./Product_Purchasers";

export default function Product_Comp(props)
{
    //The current product
    const [product,setProduct]=useState({ID:0,name:'',price:0,quantity:0})

    useEffect(
        ()=>
        {
            setProduct(props.productData)
        },[product]
    )
    return(
        <React.Fragment>
            <tr> 
                <td> {product.name}</td>
                <td> {product.price}</td>
                <td> {product.quantity}</td>
                
                <td>
                  <Product_Purchasers_Comp
                    productData={props.productData}
                    source="Product_Comp"/>  
                </td> 
            

            </tr>
        </React.Fragment>
    )
}