//Component of the first page appearing when loading the application

export default function Landing_Page_Comp()
{
    return(
        <div style={{textAlign:'center',padding:'0'}}>
            <h3>Wellcome To Ori's Store</h3>
            <p style={{textAlign:'left',align:'center',paddingLeft:'40%'}}>You can route the following pages:<br/>
               <strong>Products:</strong> All the products in the system.<br/>
               <strong>Customers:</strong> All the customers in the system.<br/>
               <strong>Purchases:</strong> All the purchases of products in by customers
                the system.<br/>
            </p>
        </div>
    )
}