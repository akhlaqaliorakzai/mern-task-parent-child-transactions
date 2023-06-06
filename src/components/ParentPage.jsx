import React, { useEffect, useState } from 'react'
import { Alert, Button, Pagination, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function ParentPage({setParent, pageNo, setPageNo}) {

  const navigate = useNavigate();
  //Table data to be loaded in the page
  const[tableData, setTableData] = useState();
  //TotalPages that will come from backend
  const[totalPages, setTotalPages] = useState();
  //To check whether data is sorted in ascending order or not
  const[isSorted, setIsSorted] = useState(false);

  //data for sorting
  const[sortData, setSortData] = useState(true);

  //In this function the data of requested page is loaded according to page number
  async function populatePage(){
    const res = await fetch("http://localhost:1337/api/parent-data",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({pageNo}),
    })
    const data = await res.json();
    if(data.status == 'ok'){
        setTotalPages(data.totalPages)
        setSortData(data.data)
        const tempData = data.data.map(parentItem=>(
            <tr>
                <td>{parentItem.id}</td>
                <td>{parentItem.sender}</td>
                <td>{parentItem.receiver}</td>
                <td>{parentItem.totalAmount}</td>
                <td><span className='ms-5'>{parentItem.totalPaidAmount}</span> <Button variant="outline-primary" className='ms-2' onClick={()=>{setParent(parentItem);navigate("child-page")}}>View Details</Button></td>
            </tr>
        ))
        setTableData(tempData);
    }
    else{
        pageNo < 1 ? setPageNo(totalPages) : setPageNo(1)

        
    }
    
  }
  //Page is populated according to the page number when page number gets changed
  useEffect(()=>{
    populatePage();
  },[pageNo])

  //Function for sorting data both in asending order and descending order
  function sort(){
    let sortedData;
    if(!isSorted){
        sortedData = sortData.sort((prev, next)=>{
            if(prev.id<next.id){
                return 1
            }
            else if(prev.id>next.id){
                return -1
            }
            else{
                return 0
            }
        })
        setIsSorted(!isSorted)
    }
    else{
        sortedData = sortData.sort((prev, next)=>{
            if(prev.id>next.id){
                return 1
            }
            else if(prev.id<next.id){
                return -1
            }
            else{
                return 0
            }
        })
        setIsSorted(!isSorted)
    }
    const tempData = sortedData.map(parentItem=>(
        <tr>
            <td>{parentItem.id}</td>
            <td>{parentItem.sender}</td>
            <td>{parentItem.receiver}</td>
            <td>{parentItem.totalAmount}</td>
            <td><span className='ms-5'>{parentItem.totalPaidAmount}</span> <Button variant="outline-primary" className='ms-2' onClick={()=>{setParent(parentItem);navigate("child-page")}}>View Details</Button></td>
        </tr>
    ))
    setTableData(tempData);

  }
  return (
    <div className='ms-5 me-5 table-responsive text-center  p-3 rounded border shadow'>
        <h4 className='mb-3 text-start text-info border rounded p-2 shadow' style={{width:"240px"}}>Parent Transactions: </h4>
        <Table bordered striped hover>
        <thead>
            <tr>
            <th>ID <Button variant='outline-info' onClick={sort}>↑↓</Button></th>
            <th>Sender</th>
            <th>Reciever</th>
            <th>Total Amount</th>
            <th>Total Paid Amount</th>
            </tr>
        </thead>
        <tbody>
            {/* Here data is loaded in a table */}
            {tableData && tableData}
        </tbody>
        </Table>
        {/* This is pagination to handle different pages */}
        <div className='d-flex justify-content-center'>
            <Pagination className='shadow'>
            <Pagination.Item onClick={()=>{setPageNo(1)}}>
                    Start
                </Pagination.Item>
                <Pagination.Item onClick={()=>{setPageNo(pageNo-1)}}>
                    {"< "}Previous
                </Pagination.Item>
                <Pagination.Item>
                    <span className='bg-primary text-white p-2 rounded'>Current Page: {pageNo}</span>
                </Pagination.Item>
                <Pagination.Item onClick={()=>{setPageNo(pageNo+1)}}>
                    Next{" >"}
                </Pagination.Item>
                <Pagination.Item onClick={()=>{setPageNo(totalPages)}}>
                    End
                </Pagination.Item>
            </Pagination>
            
        </div>
    </div>
  )
}
