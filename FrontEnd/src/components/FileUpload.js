import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SubmitB from "./SubmitB";
//import { BrowserRouter, Routes, Route,Link,NavLink } from "react-router-dom";
import bookSearch from "./bookSearch";
import questionPapersearch from "./questionPapersearch";
import Axios from "axios";
import multipaperrequest from "./axiosrequest";
const Container = styled.div`
  align-items: center;
  justify-content: center;
  margin-left: 30%;
  margin-right: 30%;
  margin-top:  50px;
  font-family: "Kalam", cursive;
  font-size: 20px;
  border: 4px solid black;
  padding-top: 5%;
  padding-right: 5%;
  padding-bottom: 5%;
  padding-left: 5%;

  

`;
function FileUpload({setDataProp}) {
  const history = useHistory();
  const [selectedBookFile, setSelectedBookFile] = useState();
  const [selectedPaperFile, setSelectedPaperFile] = useState();
  const [propdata,setpropdata]= useState();

  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isFilePicked1, setIsFilePicked1] = useState(false);
  //const navigate=useNavigate();

  const changeHandler1 = (e) => {
    setSelectedBookFile(e.target.files[0]);
    setIsFilePicked(true);
  };
  const changeHandler2 = (e) => {
    setSelectedPaperFile(Array.prototype.slice.call(e.target.files));
    setIsFilePicked1(true);
    setDataProp(undefined);
  };

  const handleSubmission = (e) => {
    if (isFilePicked1) {
      console.log(selectedPaperFile);
      console.log(selectedPaperFile.name);
      
      multipaperrequest(selectedPaperFile,setDataProp);
      // let formdata = new FormData();
      // formdata.append("file", selectedPaperFile,{
      //   contentType: "application/pdf",
      // });
      // Axios.post("https://cc70-124-253-108-202.ngrok.io/uploadpaper",formdata,{
      //   headers: {
      //     'Content-Type': "application/pdf"
      //   },
      // }).then(
      //   (res) => {
      //     console.log(res.data);
      //     setDataProp(res.data);
      //   }).catch((err) => {
      //     console.log(err);
      //   });
      // fetch("https://f09e-124-253-6-31.ngrok.io/uploadpaper",{
      //   method: "POST",
      //   body:formdata
      // }).then((res)=>{
      //   console.log(res);
      // })
      history.push('display');
    }
  };

  return (
    <>
      
      <Container>
        <p>Upload the pdf of the Question Paper </p>
        <input
          type="file"
          name="file"
          onChange={changeHandler2}
          accept="application/pdf"
          multiple
        />
        {isFilePicked1 ? (
          <div>
            {/* <p>Filename:{selectedPaperFile.name}</p>
            <p>Filetype:{selectedPaperFile.type}</p>
            <p>Size in bytes:{selectedPaperFile.size}</p> */}
          </div>
        ) : (
          <p>Select a file to show</p>
        )}
        <br/>
        <br/>
        <br/>

        <button onClick={handleSubmission}>Submit</button>

      </Container>
    
    </>
  );
}

export default FileUpload;
