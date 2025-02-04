import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import HeaderAdmin from "../components/admin/HeaderAdmin";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen">
      <SidebarAdmin />

      <div className="flex-1 flex flex-col">
        
        <main className=" flex-1 ">
          <Outlet />
        </main>
      </div>
      
    </div>
  );
};

export default LayoutAdmin;
