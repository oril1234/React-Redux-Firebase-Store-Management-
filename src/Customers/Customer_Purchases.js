
//This is the file of component of Pruducts purchased by a specific customer
import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Buy_Product_Comp from "../Products/Buy_Product"

export default function Customer_Purchases_Comp(props)
{

    //Hook for navigating to other pages
    const navigate=useNavigate()

    //Purchases data from redux reducer
    const purchsesReducerData=useSelector(state=>state.purchasesReducer)

    //Products data from redux reducer
    const productsReducerData=useSelector(state=>state.productsReducer)

    //Invoked when navigating to page of edit products
    const goToEditProduct=(product)=>
    {
        /*
        Saving the products id in a session storage to fetch is data in edit
        product component
        */
        sessionStorage['current_product_id']=product.id

        //Navigating to edit product page
        navigate('/edit_product')
    }


    /*
    True whenver this component is not rendered as a result of search of a specific
    purchase by the user
    */
    if(props.searchQuery==undefined)
    {
        
        /*
        Variable to store a list item html tag for a purchase made 
        by the customer
        */
        let purchases_to_display=[]

        /*
        Variable to store the unordered list html tag for purchases made 
        by the customer
        */
        let ul_object= <ul>
        {
            
            purchsesReducerData.purchases.map(purchase=>
            {

                //Finding products data of the current purchase
                let product=productsReducerData.products.find(
                    prod=>prod.id==purchase.productID)
            
                    
                //True if product was found and purchase wa made by the cutomer    
                if(product!=undefined &&
                        purchase.customerID==props.customerData.id)
                {
                    let li_object=<li
                    style={{cursor:'pointer'}} 
                    key={purchase.id}
                    onClick={()=>goToEditProduct(product)}>
                        {product.name+", "+purchase.date}</li>
                    purchases_to_display.push(li_object)
                    return li_object  
                }
                        
            }

          )

        }

    </ul>

    //True if the list of purchases is not empty
    if(purchases_to_display.length==0)
            return

    //True if father component is edit customer page
    if(props.source=="Edit_Customer_Comp")  
    {   return <React.Fragment>
            {ul_object}
        </React.Fragment>
    }
    
    //Returned if the father component is the customer component
    return (
        <React.Fragment>
        <tr>
        
            <td>{props.customerData.firstName+" "+props.customerData.lastName}</td>
            <td>
                {ul_object}

            </td>
            
            <td>
                {/**Rendering the component from which the customer can buy
                 * new product
                 */}
                <Buy_Product_Comp
                    key={props.customerData.id}
                    customerData={props.customerData}/>
            </td>

            
        </tr> 
        </React.Fragment>
        )
    }

    /*Executed when the rendering of this component is a result of a search query
      a specific purchase sent by the user
    */
    else
    {
        let purchases_to_display=[]
        let ul_object=<ul>
        { purchsesReducerData.purchases.map(purchase=>
        {
            let product=productsReducerData.products.find(
                prod=>
                {
                                                /**
                     * Search conditions by which products will display
                     *  */    
                    let search_conditions=purchase.customerID==
                    props.searchQuery.searchedCustomerId
                    search_conditions=search_conditions &&
                        prod.id==purchase.productID
                    
                    /*
                    True if product ID that was searched through
                    the purchases page equals the current product ID
                    or if no product ID was searched from the purchases
                    page
                    */
                    search_conditions=search_conditions
                    && (prod.id==props.searchQuery.searchedProductId
                        || props.searchQuery.searchedProductId=="" )
                        
                    /*
                    True if the date that was searched through the 
                    purchases page equals current purchase date
                    or if no date was searched
                    */
                    search_conditions=search_conditions && 
                    (purchase.date==props.searchQuery.searchedDate
                        || props.searchQuery.searchedDate=="" )
                    return search_conditions     
                }
                
            )
            
            /*True if a product satisfying the conditions of the
             search query was found
             */
            if(product!=undefined)
            {
                let li_object=<li
                    style={{cursor:'pointer'}} 
                    key={purchase.id}
                    onClick={()=>goToEditProduct(product)}>
                        {product.name+", "+purchase.date}</li>
                purchases_to_display.push(li_object)
                return li_object
            }

            
        })}</ul>

        if(purchases_to_display.length==0)
            return

            
        return(
            <React.Fragment>
                
                <tr>
                    <td>{props.customerData.firstName+" "+props.customerData.lastName}</td>
                    <td>
                        {ul_object}
                    </td>    
                </tr>
            </React.Fragment>
        )
    }
    
    
}