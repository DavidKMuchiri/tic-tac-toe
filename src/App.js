// import { useEffect, useState } from 'react';
import Table from './Components/Table/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  // const colorArray = ["tomato", "palevioletred", "brown", "crimson", "cadetblue", "cornflowerblue", "dodgerblue", "teal", "thistle", 
  // "violet", "chartreuse", "antiquewhite" ,"tan", "beige", "coral"];
  // const random = Math.floor(Math.random() * ((colorArray.length) - 0) ) + 0;
  // const [bColor, setBColor] = useState("antiquewhite");
  // console.log(bColor);

  const showWinner = (message) =>{
    toast.success(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  const showLoser = (message) =>{
    toast.error(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const showInfo = (information) =>{
    toast.info(information, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  return (
    <div className='App'>
        <Table showWinner={showWinner} showLoser={showLoser} showInfo={showInfo} />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </div>
  );
}

export default App;
