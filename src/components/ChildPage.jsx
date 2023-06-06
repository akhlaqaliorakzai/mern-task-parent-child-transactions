import React, { useEffect, useState } from 'react'
import { Alert, Table } from 'react-bootstrap'

export default function ChildPage({parent}) {

  //Table data to be loaded in the page
  const[tableData, setTableData] = useState();
  //If there is no child available corresponding to the parent
  const[noDataAvailable, setNoDataAvailable] = useState(false);

  //In this function the data is loaded according to the parent
  async function populatePage(){
    const res = await fetch("http://localhost:1337/api/child-data",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({parentId: parent.id}),
    })
    const data = await res.json();
    if(data.status == 'ok'){
        const tempData = data.data.map(childItem=>(
            <tr>
                <td>{childItem.id}</td>
                <td>{parent.sender}</td>
                <td>{parent.receiver}</td>
                <td>{parent.totalAmount}</td>
                <td>{childItem.paidAmount}</td>
            </tr>
        ))
        setTableData(tempData);
    }
    else{
        alert("failed to load page")   
    }
    
  }
  //The data is loaded upon first render of the component
  useEffect(()=>{
    populatePage();
  },[])
  return (
    <div className='ms-5 me-5 table-responsive text-center  p-3 rounded border shadow'>
        <h4 className='mb-3 text-warning border rounded p-2 ps-1 shadow' style={{width:"230px"}}>Child Transactions: </h4>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Total Amount</th>
            <th>Paid Amount</th>
            </tr>
        </thead>
        
        <tbody>
            {
                // Here data is loaded to the table if the data is available 
                // If data is not available then an alert will be loaded which will show no data available for the parent 
                tableData ? tableData:
                <tr className='text-white'>
                    {
                        setTimeout(()=>{
                            !tableData && setNoDataAvailable(true)
                        },500)
                    }
                    {
                        noDataAvailable &&
                        <td colSpan={5}>
                            <Alert className='bg-info text-white'>No Data available for the parent with id: {parent.id}</Alert>
                        </td>

                    }
                    
                </tr>  
            }
        </tbody>
        </Table>
    </div>
  )
}
