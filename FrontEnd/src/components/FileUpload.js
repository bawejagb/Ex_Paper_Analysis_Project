import React , {useState}from 'react'
import {useHistory} from 'react-router-dom';
import styled from "styled-components";
import SubmitB from './SubmitB';
//import { BrowserRouter, Routes, Route,Link,NavLink } from "react-router-dom";
import bookSearch from './bookSearch';
import questionPapersearch from './questionPapersearch';


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
  const history=useHistory();
    const [selectedFile,setSelectedFile]=useState();
    const [selectedFile1,setSelectedFile1]=useState();

    const [isFilePicked,setIsFilePicked]=useState(false);
    const [isFilePicked1,setIsFilePicked1]=useState(false);
    //const navigate=useNavigate();

    const changeHandler1 =(e) =>{
        setSelectedFile(e.target.files[0]);
        setIsFilePicked(true);
    };
    const changeHandler2 =(e) =>{
      setSelectedFile1(e.target.files[0]);
      setIsFilePicked1(true);
  };
  
    const handleSubmission=(e)=>{ 
      if(isFilePicked1){
        history.push('qp_search');
      }

    };

  return (
    <>
    <Container> 
        <p>Upload the pdf of the Book </p>
        <input type="file" name="file" onChange={changeHandler1}/>
        { isFilePicked? (
        <div>
            <p>Filename:{selectedFile.name}</p>
            <p>Filetype:{selectedFile.type}</p>
            <p>Size in bytes:{selectedFile.size}</p>
          
            </div>
        ): (
         <p>Select a file to show</p>
        
    
     

        )}
    <div>
   
     </div>

         
    

    </Container>

    <Container> 
        <p>Upload the pdf of the Question Paper </p>
        <input type="file" name="file" onChange={changeHandler2}/>
        { isFilePicked1? (
        <div>
            <p>Filename:{selectedFile1.name}</p>
            <p>Filetype:{selectedFile1.type}</p>
            <p>Size in bytes:{selectedFile1.size}</p>
          
            </div>
        ): (
         <p>Select a file to show</p>
        
    
     

        )}
    <div>
   
     </div>

         
    

    </Container>
    <Container>
    <button onClick={handleSubmission}>Submit</button>
</Container>


    </>
  )
}

export default FileUpload;