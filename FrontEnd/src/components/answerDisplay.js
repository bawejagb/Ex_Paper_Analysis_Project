import React, { Component } from 'react'
// import data from './sample_data.json';
import styled from 'styled-components';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import ReactTable from "react-table";
import './answerDisplay.css';
import BasicTable from './Table';
import {Link} from 'react-router-dom'/*const Table=styled.table`
 border:2px solid black;
`;*/
import { Circles } from 'react-loader-spinner';

//import JSON from 'JSON';
//console.log(info);
//console.log(questions);
//console.log(answers);

const Arsh=styled.div`
    align-items:center;
    margin-left:45%;
    margin-top:30%;


`

const answerDisplay = ({dataProp}) => {
  // console.log(dataProp);
  // console.log(dataProp);
  // console.log(dataProp);
  if(dataProp===undefined){
    return (
      <Arsh>
      
        <Circles
          height="120"
          width="120"
          radius="12"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </Arsh>
    )
  }
  //var data =dataProp;
/*var questions = [];
var answers = [];
var data = dataProp;
for (let k in data) {
  // console.log(k);
  questions = data[k].q_arr;
  answers = data[k].ans_arr;
}
let info = [];
let n = questions.length;
for (let i = 0; i < n; i++) {
  info[i] = {
    'q1': questions[i],
    'ans1': answers[i][0],
    'ans2': answers[i][1],
    'ans3': answers[i][2]
  };
}
  const dummy = [{
    'id': 0,
    'q1': 'q1',
    'ans1': 'a1',
    'ans2': 'a2',
    'ans3': 'a3'
  }, {
    'id': 1,
    'q1': 'q2',
    'ans1': 'a1',
    'ans2': 'a2',
    'ans3': 'a3'
  }]
  var i=0;
  */
 /*const data={
  prop1: [['Q1','Who is ms dhoni','L1','L2','L3'],['Q2','Who is Jagrit bareja','L1','L2','L3'],['Q3','Who is gaurav bareja','L1','L2','L3']],
  prop2:[['gk','q1 q4 q5 q6'],['science','q2'],['geography','q3']]
 };*/
 var data=dataProp;
 //console.log(data);
 let info=[];
 let info2=[];
 //var i=0;
 var table1=data.links;
 var table2=data.topics;
 let len_table1=table1.length;
 let len_table2=table2.length;

 for(let i=0;i<len_table1;i++){
  info[i]={
    'q_no':table1[i][0],
    'q':table1[i][1],
    'ans1':table1[i][2],
    'ans2':table1[i][3],
    'ans3':table1[i][4]
  };
 // i++;
 }
//  console.log(info);
 for(let i=0;i<len_table2;i++){
  info2[i]={
    'topic':table2[i][0],
    'ques':table2[i][1]
  };
 // i++;
 }
//  console.log(info2);


  return (
  
   <>
    <h3 className="table-head">Question Reference Link</h3>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell class="Bold" align="left">Qn. No.</TableCell>
            <TableCell class="Bold" align="left">Question</TableCell>
            <TableCell class="Bold" align="right">Ans. Link 1</TableCell>
            <TableCell class="Bold" align="right">Ans. Link 2</TableCell>
            <TableCell class="Bold" align="right">Ans. Link 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {info.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.q_no}</TableCell>
              <TableCell align="left">{row.q}</TableCell>
              <TableCell align="right"><a href={row.ans1} target="_blank" > Link1</a></TableCell>
              <TableCell align="right"><a href={row.ans2} target="_blank" > Link2</a></TableCell>
              <TableCell align="right"><a href={row.ans3} target="_blank" > Link3</a></TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <br/>

    <h3 className="table-head">Important Topics</h3>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell class="Bold" align="left">Topic</TableCell>
            <TableCell class="Bold" align="left">Questions Asked</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          
          {info2.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.topic}</TableCell>
              <TableCell align="left">{row.ques}</TableCell>
              
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </>
  );

}
export default answerDisplay;

