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
  console.log(dataProp);
  if(dataProp==undefined){
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
var questions = [];
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
  return (
  
   <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Question</TableCell>
            <TableCell align="right">Ans Link 1</TableCell>
            <TableCell align="right">Ans Link 2</TableCell>
            <TableCell align="right">Ans Link 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {info.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">Q{i++}{row.q1}</TableCell>
              <TableCell align="right"><a href={row.ans1} target="_blank" > Link1</a></TableCell>
              <TableCell align="right"><a href={row.ans2} target="_blank" > Link2</a></TableCell>
              <TableCell align="right"><a href={row.ans3} target="_blank" > Link3</a></TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </>
  );

}
export default answerDisplay;

