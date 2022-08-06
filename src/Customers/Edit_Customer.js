
//This is the componet of edit product's data page
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteCustomer, updateCustomer } from "../actions/customersActions"
import Customer_Purchases_Comp from "./Customer_Purchases"

export default function Edit_Customer_Comp()
{

    //Customers data fetched from redux reducer
    const customersReducerData=useSelector(state=>state.customersReducer)

    //The customer that is beint edited
    const [currentCustomer,setCurrentCustomer]=useState()

    //Hook to send actions to redux reducer
    const dispatch=useDispatch()

    //Hook to navigate to another page
    const navigate=useNavigate()

    useEffect(()=>
    {
        
        //Fetching customer data from redux using session storage
        let id=sessionStorage['current_customer_id'] 
        let foundCustomer=customersReducerData.customers.find(cust=>cust.id==id)
        if(foundCustomer!=undefined)
            setCurrentCustomer({...foundCustomer})

    },[customersReducerData])

    //Invoked when a customer is deleted
    const handleDelete=async()=>
    {
        let name=currentCustomer.firstName+' '+currentCustomer.lastName

        //Dispatching the action of deleting a customer from redux
        dispatch(deleteCustomer(currentCustomer))
        alert("The customer "+name+" was deleted")
        navigate('/customers')
    }

    //Invoked when a customer data is updated
    const handleUpdate=async()=>
    {
        //Dispatching the action of updating a customer from redux
        dispatch(updateCustomer(currentCustomer))
    }

    return(
        <div>
            <div className="Edit-Customer-Div">
                {/**Form for editing customer */}
                <form>
                <h1>Edit Customer:</h1>

                    <div className="Edit-Customer-Input-Div">  
                        <label>First Name: </label>
                        <input 
                            value={currentCustomer!=undefined?
                                    currentCustomer.firstName:''}
                            onChange={(e)=>setCurrentCustomer({...currentCustomer,
                                        firstName:e.target.value })}/>                    
                    </div>
                    <div className="Edit-Customer-Input-Div">  
                        <label>Last Name: </label>
                        <input 
                            value={currentCustomer!=undefined?
                                currentCustomer.lastName:''}
                            onChange={(e)=>setCurrentCustomer({...currentCustomer,
                                lastName:e.target.value })}/>                    
                    </div>
                    <div className="Edit-Customer-Input-Div">  
                        <label>City </label>
                        <input  
                            value={currentCustomer!=undefined?
                                currentCustomer.city:''}
                            onChange={(e)=>setCurrentCustomer({...currentCustomer,
                                city:e.target.value })}/>                    
                    </div>

                    <div style={{marginTop:'2%'}} className="Edit-Customer-Input-Div">
                         {/**Button to update product data */}       
                        <input
                            type="button" 
                            value="Update"
                            onClick={()=>handleUpdate()}/>

                        {/**Button to delete product data */}     
                        <input 
                            onClick={()=>handleDelete()}
                            type="button" value="Delete Customer Data"/>
                    </div>
                </form>

            </div>

             {/**Region for customers and their purchases of this product */}                   
            <div  className="Purchased-By-Div">
                <h4>Customer's Purchases:</h4>
                <h6 style={{fontWeight:'normal'}}>{`(Choose one of the purchases to edit product date)`}</h6>

            {
                //Rendering purchases of the product as long as it exists
                currentCustomer!=undefined &&
                <Customer_Purchases_Comp
                source={"Edit_Customer_Comp"}
                 customerData={currentCustomer}/>
            }

            </div>
        </div>
    )
}