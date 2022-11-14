import React, { Component } from 'react'
import data from './sample_data.json';
import styled from 'styled-components';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import ReactTable from "react-table";
import './answerDisplay.css';
import BasicTable from './Table';
import {Link} from 'react-router-dom'/*const Table=styled.table`
 border:2px solid black;
`;*/


//import JSON from 'JSON';
var questions = [];
var answers = [];
//console.log(data)
//const text=JSON.parse(data);
//console.log(data['289bcdb1-7-1'].ans_arr);
for (let k in data) {
  // console.log(k);
  questions = data[k].q_arr;
  answers = data[k].ans_arr;
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

//console.log(info);



//console.log(questions);
//console.log(answers);



const answerDisplay = () => {
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
              <TableCell align="left">{row.q1}</TableCell>
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

