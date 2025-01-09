import React from "react";
import AppRoutes from "./routes/AppRoutes";

import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  //js
  return (
    <>
      <ToastContainer/>
      <AppRoutes/>
    </>
  )
};
console.log(AppRoutes)
export default App;
