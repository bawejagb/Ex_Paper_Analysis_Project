import React from 'react'
import styled from "styled-components";

const Container=styled.div`
text-align: center;
margin-left: 50px;
margin-top: 50px;
`;
function SubmitB() {
    const handleSubmission=()=>{ 
     //console.log(selectedFile.name);
    
    };

  return (
    <Container>
    <button onClick={handleSubmission}>Submit</button>
</Container>

  )
}

export default SubmitB;