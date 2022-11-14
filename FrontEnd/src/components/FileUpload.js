import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SubmitB from "./SubmitB";
//import { BrowserRouter, Routes, Route,Link,NavLink } from "react-router-dom";
import bookSearch from "./bookSearch";
import questionPapersearch from "./questionPapersearch";
import Axios from "axios";
Axios.defaults.timeout = 50000
const Container = styled.div`
  align-items: center;
  justify-content: center;
  margin-left: 250px;
  margin-right: 100px;
  margin-top: 50px;
  font-family: "Kalam", cursive;
  font-size: 20px;
`;
function FileUpload(setDataProp) {
  const history = useHistory();
  const [selectedBookFile, setSelectedBookFile] = useState();
  const [selectedPaperFile, setSelectedPaperFile] = useState();

  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isFilePicked1, setIsFilePicked1] = useState(false);
  //const navigate=useNavigate();

  const changeHandler1 = (e) => {
    setSelectedBookFile(e.target.files[0]);
    setIsFilePicked(true);
  };
  const changeHandler2 = (e) => {
    setSelectedPaperFile(e.target.files[0]);
    setIsFilePicked1(true);
  };

  const handleSubmission = (e) => {
    if (isFilePicked1) {
      console.log(selectedPaperFile);
      console.log(selectedPaperFile.name);
      let formdata = new FormData();
      formdata.append("file", selectedPaperFile);
      formdata.append("name", selectedPaperFile.name);
      Axios({
        url: "https://f09e-124-253-6-31.ngrok.io/uploadpaper",
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          accept: "application/json",
        },
        data: formdata,
      }).then(
        (res) => {
          console.log(res.data);
          setDataProp(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
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
        <p>Upload the pdf of the Book </p>
        <input
          type="file"
          name="file"
          onChange={changeHandler1}
          accept="application/pdf"
        />
        {isFilePicked ? (
          <div>
            <p>Filename:{selectedBookFile.name}</p>
            <p>Filetype:{selectedBookFile.type}</p>
            <p>Size in bytes:{selectedBookFile.size}</p>
          </div>
        ) : (
          <p>Select a file to show</p>
        )}
        <div></div>
      </Container>

      <Container>
        <p>Upload the pdf of the Question Paper </p>
        <input
          type="file"
          name="file"
          onChange={changeHandler2}
          accept="application/pdf"
        />
        {isFilePicked1 ? (
          <div>
            <p>Filename:{selectedPaperFile.name}</p>
            <p>Filetype:{selectedPaperFile.type}</p>
            <p>Size in bytes:{selectedPaperFile.size}</p>
          </div>
        ) : (
          <p>Select a file to show</p>
        )}
        <div></div>
      </Container>
      <Container>
        <button onClick={handleSubmission}>Submit</button>
      </Container>
    </>
  );
}

export default FileUpload;
