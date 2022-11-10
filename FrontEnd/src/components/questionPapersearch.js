import React from 'react'
import styled from "styled-components";

const Container=styled.div`
justify-content:center;
text-align:center;
align-items:center;
text-overflow: ellipsis;
overflow: hidden;
font-weight: 500;
font-size:25px;
margin-top:20px;
margin-left:50px;
margin-right:50px;
font-family: 'Kalam', cursive;
`;
const questionPapersearch = (dataProp) => {
  console.log("Paper Page: ",dataProp);
  return (
    <Container>Welcome to Ex-paper analysis. One stop place to get free from all exam related wories. Analyse all your previous year question papers with our application and get to know what questions are being asked frequently, questions from which topic are being asked. Also get the solution to a particular question in the question paper uploaded by you.
  <br/>
    We hope you a great time using our application.
    <br/>
    HAPPY LEARNING!
   
    
     </Container>
  )
}

export default questionPapersearch;