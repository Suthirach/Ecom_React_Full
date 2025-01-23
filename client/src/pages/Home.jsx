import React from "react";
import ContentCaroucal from "../components/card/home/ContentCaroucal";
import Bestseller from "../components/card/home/BestSeller";
import NewProduct from "../components/card/home/NewProduct";

const Home = () => {
  return (
    <div className="px-44">
        <ContentCaroucal/>

        
        <Bestseller/>

        
        <NewProduct/>
    </div>
  )
};

export default Home;
