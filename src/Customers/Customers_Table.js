import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Customer_Purchases_Comp from "./Customer_Purchases"


export default function Customers_Table(props)
{
    //Object with the redux data related to product 
    const productsReducerData=useSelector(state=>state.productsReducer)
    
    //Object with the redux data related to customers 
    const customersReducerData = useSelector((state) => state.customersReducer)

    //Data set of all the products
    const [products,setProducts]=useState([])

    //The ccustomer id that is selected from a dropdown
    const [selectedCustomerId,setSelectedCustomerId]=useState("")

    //The product id that is selected from a dropdown
    const [selectedProductId,setSelectedProductId]=useState("")

    //The Purchase date that is selected from a dropdown
    const [selectedDate,setSelectedDate]=useState("")

    /*
    The search query of data according to selected customer id,product id and 
    purchase date. Updated only when search is executed
    */
    const [searchQuery,setSearchQuery]=useState({
        searchedProductId:"",
        searchedCustomerId:"",
        searchedDate:""
    })
        
    /*
    True when father component is customer page. Set initially to false when father
    component is purchase page, but is changed to true when a search is
    executed through this page  
    */
    const [showTable,setShowTable]=useState(true)

    useEffect(()=>
        {
            /*Hiding the below table only if father component is purchases
            page. The table will be displayed when a search of a purchase is
            executed
            */
            setShowTable(props.source!="Purchases_Comp")
        },[]
    )

    useEffect(()=>
    {
        setProducts([...productsReducerData.products])
    },[productsReducerData]
    )


    //Invoked when a product is selected from the dropdown list of purchases page
    const handleSelectProduct=(product_id)=>
    {
        let foundProduct=
        productsReducerData.products.find(prod=>
            prod.id==product_id);

        setSelectedProductId(foundProduct!=undefined?foundProduct.id:"")
    }

    //Invoked when a customer is selected from the dropdown list of purchases page
    const handleSelectCustomer=(customer_id)=>
    {
        let foundCustomer=
        customersReducerData.customers.find(cust=>
            cust.id==customer_id);
            setSelectedCustomerId(foundCustomer!=undefined?foundCustomer.id:"")        
    }

    //Invoked when a purchase is searched by the purchaser, product and date
    const handleSearch=()=>
    {
        //Formattig the date according to dd/mm/yyyy pattern
        let date=new Date(selectedDate)
        let d=String(date.getDate())
        let m=String(date.getMonth()+1)
        let y=date.getFullYear()

        
        setSearchQuery({
            searchedProductId:selectedProductId,
            searchedCustomerId:selectedCustomerId,
            searchedDate:selectedDate!=""?`${d}/${m}/${y}`:"" })
        setShowTable(true)
    }

    //Invoked when the user clears the search results of a query
    const handleClear=()=>
    {
        setSelectedProductId("")
        setSelectedCustomerId("")
        setSelectedDate("")
        setShowTable(false)
    }


    return(
    <div>

        <h1>{props.source=="Customers_Comp"?"Customers:":"Purchases:"}</h1>
        {/*The panel from which products, customers 
        and dates are picked displays only if the father component is 
        the purchases page*/}
        {props.source=="Purchases_Comp" &&
        <div>

            
            <form>
                <div>

                    {/**Dropdown for selecting a product by which purchases
                     * search query is filtered
                     */}
                    <select
                        value={selectedProductId}
                        onChange={(e)=>handleSelectProduct(e.target.value)}>
                        <option>Choose A Product</option>
                            {
                                products!=undefined &&
                                products.map(product=>
                                    {
                                        return <option
                                            key={product.id}
                                            value={product.id}
                                            >{product.name}</option>
                                    })
                            }
                    </select><br/>

                    {/**Dropdown for selecting a customer by which purchases
                     * search query is filtered
                     */}
                    <select
                        value={selectedCustomerId}
                        onChange={(e)=>handleSelectCustomer(e.target.value)}>
                        <option>Choose A Customer</option>
                            {
                                customersReducerData.customers.map(customer=>
                                    {
                                        return <option
                                            key={customer.id}
                                            value={customer.id}>
                                                {customer.firstName+" "
                                            +" "+customer.lastName}</option>
                                    })
                            }
                    </select><br/>
                    <label htmlFor="purchase-date">Purchase Date:</label>

                    {/**Date picker of a date by which search query is filtered */}
                    <input type="date"
                        value={selectedDate}
                        onChange={(e)=>setSelectedDate(e.target.value)}
                        id="purchase-date"
                    />
                </div>

                {/**Button to invoke a seatch query of a specific purchase */}
                <input type="button" value="Search" onClick={()=>handleSearch()}/>
                
                {/**Button to clear search query results */}
                <input type="button"
                    onClick={()=>handleClear()}
                    value="Clear Results"/>
            </form>

        </div>
        }


        {/**Table to show customers and their purchases */}
        { showTable &&
        <table style={{margin:'0 auto'}} border="1">
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Customer Purchases</th>
                    {props.source=="Customers_Comp" &&
                        <th>Buy Product</th>}
        
                </tr>
            </thead>
        
            <tbody>
    
            {
                    customersReducerData.customers.map((customer)=>
                    {
                        /* This condition is true when father component is 
                        purchases page
                        */
                        if(props.source=="Purchases_Comp")
                        {
                            /*
                               True if the current customer is not the one
                               that is being searched
                            */
                            if(searchQuery.searchedCustomerId!="" &&
                                customer.id!=searchQuery.searchedCustomerId )
                                return
                           

                            return(
                                /*Rendering of the customer purchases according to
                                  the search query
                                */
                                <Customer_Purchases_Comp
                                    key={customer.id}
                                    customerData={customer}
                                    searchQuery={{...searchQuery,
                                        searchedCustomerId:customer.id}}/>
                            )
                        }

                        else
                        {
                            //Returning customers purchases not filtered
                            return(
                                <Customer_Purchases_Comp
                                key={customer.id}
                                customerData={customer}/>
                            )
                        }

                        

                    }
    
                )
            }
    
            </tbody>
        
        </table>
        }
              
   
    </div>
    )
}