import React , {useState}from 'react'
import styled from "styled-components";

const Container=styled.div`
align-items: center;
justify-content: center;
margin-left:250px;
margin-right: 100px;
margin-top: 50px;
font-family: 'Kalam', cursive;
font-size:20px;



`;
function FileUpload(props) {
    const [selectedFile,setSelectedFile]=useState();
    const [isFilePicked,setIsFilePicked]=useState(false);

    const changeHandler =(e) =>{
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
    };
    const handleSubmission=()=>{ 

    };

  return (
    <Container> 
        <p>Upload the pdf of the {props.name} </p>
        <input type="file" name="file" onChange={changeHandler}/>
        { isFilePicked? (
        <div>
            <p>Filename:{selectedFile.name}</p>
            <p>Filetype:{selectedFile.type}</p>
            <p>Size in bytes:{selectedFile.size}</p>
          
            </div>
        ): (
         <p>Select a file to show</p>
        )}
    

    </Container>
  )
}

export default FileUpload;