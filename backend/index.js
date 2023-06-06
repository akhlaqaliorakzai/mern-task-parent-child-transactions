const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const fs = require("fs");


app.post("/api/parent-data", async (req, res)=>{
    try{
        //Destructuring is used to get page number
        const {pageNo} = req.body;
        
        //Here file Parent.json is read
        fs.readFile('../assets/Parent.json', 'utf8', (error, data)=>{
            if(error){
                return res.status(400).json({error: "Page is not available"});
            }

            // Here first the file data is converted into JavaScript object
            let dataObj = {}
            dataObj = JSON.parse(data);

            //Here pagination is done i.e., data is loaded according to page number
            const i = pageNo + (pageNo-2)
            const rowsData = dataObj.data.slice(i, i+2) 
            if(rowsData.length>0){
                //Here Child.json file is read to calculate the total paid amount of each parent
                fs.readFile('../assets/Child.json', 'utf8', (error, data)=>{
                    if(error){
                        return res.status(400).json({error: "Page is not available"});
                    }

                    // Here first the file data is converted into JavaScript object
                    let childDataObj = {}
                    childDataObj = JSON.parse(data);

                    //Here the total paid amount is calculated for each parent from its children and then added to its array
                    rowsData.forEach(parentItem=>{
                        const children = childDataObj.data.filter(children => children.parentId == parentItem.id)
                        let totalPaidAmount = 0;
                        children.forEach(childItem=>{
                            totalPaidAmount+=childItem.paidAmount
                        })
                        parentItem.totalPaidAmount = totalPaidAmount
                    })
                    
                    //Here the total pages are calculated
                    totalPages = Math.ceil(dataObj.data.length/2)

                    res.json({status:"ok", data:rowsData, totalPages: totalPages});
                })
                
            }
            else{
                res.status(400).json({error: "Page is not available"})
            }
           
        })
        
    }
    catch(error){
        res.status(400).json({error: "Page is not available"})
    }
    
})


app.post("/api/child-data", async (req, res)=>{
    try{
        //destructuring is used to get parentId from the body
        const {parentId} = req.body;

        //Here file is read
        fs.readFile('../assets/Child.json', 'utf8', (error, data)=>{
            if(error){
                return res.status(400).json({error: "Page is not available"});
            }
            // Here first the file data is converted into JavaScript object
            let dataObj = {}
            dataObj = JSON.parse(data);

            //Then the childData is filtered out if parentId is equal to child's parentId
            const childData = dataObj.data.filter(childItem => childItem.parentId == parentId)

            
            
            if(childData.length>0){
                //Data sorted in ascending order
                sortedChildData = childData.sort((prev, next)=>{
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
                res.json({status: "ok", data:sortedChildData})
            }
           
        })
        
    }
    catch(error){
        res.status(400).json({error: "Page is not available"})
    }
    
})

app.listen(1337,()=>{
    console.log("Server started on 1337...")
})
