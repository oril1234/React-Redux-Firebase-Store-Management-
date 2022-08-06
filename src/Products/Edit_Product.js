//Component to edit products details

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteProduct, fetchProducts, updateProduct } from "../actions/productsActions"
import Product_Purchasers_Comp from "./Product_Purchasers"

export default function Edit_Product_Comp()
{
    //Products data from reduxx reducer
    const productsReducerData=useSelector(state=>state.productsReducer)

    //Edited product
    const [currentProduct,setCurrentProduct]=useState()

    //Hook to dispatch editing actions of product to redux store
    const dispatch=useDispatch()

    //Hook to navigate to another page
    const navigate=useNavigate()

    useEffect(()=>
    {
        //Loading product data using session storage
        let id=sessionStorage['current_product_id'] 
        let foundProduct=productsReducerData.products.find(prod=>prod.id==id)
        if(foundProduct!=undefined)
            setCurrentProduct({...foundProduct})

    },[productsReducerData])


    //Invoked when delete product button is clicked
    const handleDelete=async()=>
    {
        let name=currentProduct.name
        dispatch(deleteProduct(currentProduct))
        alert("Product "+name+" was deleted")
        navigate('/products')

    }

    //Invoked when update product button is clicked
    const handleUpdate=async()=>
    {
        dispatch(updateProduct(currentProduct))
        alert("Product data was updated")
    }

    return(
        <div>
            <div >
                {/**Form of editing product */}
                <form>
                    <h1>Edit Product:</h1>
                    <div className="Edit-Product-Input-Div">  
                        <label>Name: </label>
                        <input 
                            value={currentProduct!=undefined?
                                    currentProduct.name:''}
                            onChange={(e)=>setCurrentProduct({...currentProduct,
                                        name:e.target.value })}/>                    
                    </div>
                    <div className="Edit-Product-Input-Div">  
                        <label>Price: </label>
                        <input 
                            value={currentProduct!=undefined?
                                currentProduct.price:''}
                            type="number"    
                            onChange={(e)=>setCurrentProduct({...currentProduct,
                                price:e.target.value })}/>                    
                    </div>
                    <div className="Edit-Product-Input-Div">  
                        <label>Quantity: </label>
                        <input type='number' 
                            value={currentProduct!=undefined?
                                currentProduct.quantity:''}
                            onChange={(e)=>setCurrentProduct({...currentProduct,
                                quantity:e.target.value })}/>                    
                    </div>
                    <div style={{marginTop:'2%'}} className="Edit-Product-Input-Div">

                        {/**Button that when clicked product data is saved */}        
                        <input 
                            type="button" 
                            value="Update"
                            onClick={()=>handleUpdate()}/>

                         {/**Button that when clicked product data is deleted */}    
                        <input 
                            onClick={handleDelete}
                            type="button" value="Delete Product Data"/>
                    </div>

                </form>

            </div><br/>
            <div className="Purchased-By-Div">

            {/**Purchasers of product */}    
            <h4>Purchased By</h4>
            <h6 style={{fontWeight:'normal'}}>{`(Choose one of the parchasers to edit their data)`}</h6>

                 {
                    currentProduct!=undefined &&
                    <Product_Purchasers_Comp 
                        source="Edit_Product_Comp"
                        productData={currentProduct}/>

                 }

                    

            </div>
        </div>
    )
}