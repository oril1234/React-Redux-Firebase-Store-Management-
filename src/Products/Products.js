/*THe component of the products page in which the products in the systems are 
  displayed in a table
*/

import React from 'react'
import {  useSelector } from 'react-redux'
import Product_Comp from './Product'

export default function Products_Comp() 
{

  //Products data from redux reducer
  const productsReducerData = useSelector((state) => state.productsReducer)

  //Purchases data from redux reducer
  const purchasesReducerData = useSelector((state) => state.purchasesReducer)

  return (
    <div>

        <h1>Products:</h1>

        <div style={{marginBottom:'3%'}}>
          <strong>Total Amount: </strong>
          <label style={{marginBottom:'3%'}}>
            {purchasesReducerData.purchases.length+" products were purchased"} </label>
        </div>
        <table style={{margin:'0 auto'}}  border="1">
                <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Product Purchasers</th>

                </tr>
                </thead>
                
                <tbody>

                { productsReducerData.products.map((product) => (
                      <Product_Comp 
                        key={product.id}
                        productData={product} />
                    ))}

                </tbody>
                


        </table>
            
 
    </div>
  )
}

