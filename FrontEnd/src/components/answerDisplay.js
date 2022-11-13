import React,{Component} from 'react'
import data from './sample_data.json';
import styled from 'styled-components';
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper}from '@mui/material';
import ReactTable from "react-table";  
import './answerDisplay.css';
/*const Table=styled.table`
 border:2px solid black;
`;*/


//import JSON from 'JSON';
var questions=[];
var answers=[];
//console.log(data)
//const text=JSON.parse(data);
//console.log(data['289bcdb1-7-1'].ans_arr);
for(let k in data){
 // console.log(k);
  questions=data[k].q_arr;
  answers=data[k].ans_arr;
  //for(let j in k){
   // console.log(j);
    
        /*if(k==='rois')
        continue;
        else if(k==='q_arr'){
        for(let j in k){
            questions.push(j);
        }

        }

       else if(k==='ans_arr'){
       // answers.push(k[j]);
       for(let j in k){
        answers.push(j);
    }
}*/
  }
  let info=[];
    let n=questions.length;
    for(let i=0;i<n;i++){
     info[i]={
      'q1':questions[i],
      'ans1':answers[i][0],
      'ans2':answers[i][1],
      'ans3':answers[i][2]
     };
    }

    //console.log(info);



//console.log(questions);
//console.log(answers);


 
const answerDisplay = () => {
  const dummy = [{
    'id':0,
    'q1':'q1',
    'ans1':'a1',
    'ans2':'a2',
    'ans3':'a3'
   },{
    'id':1,
    'q1':'q2',
    'ans1':'a1',
    'ans2':'a2',
    'ans3':'a3'
   }]
  return (
    
/*<TableContainer component={Paper}>
<Table aria-label='simple table'>
  <TableHead>
    <TableRow>
      <TableCell>
        Question
      </TableCell>
      <TableCell>
        Answer Link 1
      </TableCell>
      <TableCell>
        Answer Link 2
      </TableCell>
      <TableCell>
        Answer Link 3
      </TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {
    /*info.map((row)=>(
   <TableRow key={row.id}
   sx={{'&:last-child td, &:last-child th':{border:0}}}
   >
    
    <TableCell>{row.q1}</TableCell>
    <TableCell>{row.ans1}</TableCell>
   </TableRow>
    ))*/
   /*Object.entries(dummy).map(row=>{
    //console.log(row[1].q1);
    console.log(row[1]);
   <TableRow
   key={row[1].id}
   >
      <TableCell>
        {row[1].q1}
      </TableCell>
      <TableCell>
        {row[1].ans1}
      </TableCell>
      <TableCell>
        {row[1].ans2}
      </TableCell>
      <TableCell>
        {row[1].ans3}
      </TableCell>
    </TableRow>
   })
//})
}

  </TableBody>
</Table>
</TableContainer>*/
/*<div>
<ReactTable
data={dummy}
columns={columns}
defaultPageSize={2}
pageSizeOptions={[2,4,6]}
/>
</div>
  )
}

export default answerDisplay;*/
/*class App extends Component {  
  render() {  
     const data = [{  
        name: 'Ayaan',  
        age: 26  
        },{  
         name: 'Ahana',  
         age: 22  
         },{  
         name: 'Peter',  
         age: 40      
         },{  
         name: 'Virat',  
         age: 30  
         },{  
         name: 'Rohit',  
         age: 32  
         },{  
         name: 'Dhoni',  
         age: 37  
         }]  
     const columns = [{  
       Header: 'Name',  
       accessor: 'name'  
       },{  
       Header: 'Age',  
       accessor: 'age'  
       }]  
    return (  
          <div>  
              <ReactTable  
                  data={data}  
                  columns={columns}  
                  defaultPageSize = {2}  
                  pageSizeOptions = {[2,4, 6]}  
              />  
          </div>        
    )  
  }  
}  */
  
<table>
  <tr>
    <th>Question</th>
    <th>Ans Link 1</th>
    <th>Ans Link 2</th>
    <th>Ans Link 3</th>
  </tr>
  {info.map((val,key)=>(
    
      <tr key={key}>
       <td className="quest">{val.q1}</td> 
       <td><a href={val.ans1}>Link 1</a></td>
       <td><a href={val.ans2}>Link 2</a></td>
       <td><a href={val.ans3}>Link 3</a></td>
      </tr>
    
  ))}
</table>
  );
}
export default answerDisplay;  