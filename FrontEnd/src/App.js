import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import FileUpload from './components/FileUpload';
import SubmitB from './components/SubmitB';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <section className="glass">
          <Card/>
          <FileUpload name="Book"/>
          <FileUpload name="Question Paper"/>
          <SubmitB/>


        </section>
        <div className="circle1"></div>
        <div className="circle2"></div>
      </main>
    </>
  );
}

export default App;
