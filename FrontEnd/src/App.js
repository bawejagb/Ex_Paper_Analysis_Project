import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import FileUpload from "./components/FileUpload.js";
import SubmitB from "./components/SubmitB";
import { BrowserRouter, Route } from "react-router-dom";
import AnswerDisplay from "./components/answerDisplay";
import { useState } from "react";

function App() {
  const [dataProp, setDataProp] = useState();
  return (
    <>
      <Navbar />
      <main>
        <section className="glass">
          <Route exact path="/">
            <Card />
            <FileUpload setDataProp={setDataProp} />
          </Route>
          <Route exact path="/display">
            <AnswerDisplay dataProp={dataProp}/>
          </Route>
        </section>
        <div className="circle1"></div>
        <div className="circle2"></div>
      </main>
    </>
  );
}

export default App;
