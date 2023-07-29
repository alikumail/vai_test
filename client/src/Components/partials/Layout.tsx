import React, { ReactNode, useState } from 'react';
import Header from "./Header";
import Sidebar from "./SideBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children } : LayoutProps) => {
  const [showMenu, setShowMenu] = useState(false);
  
  return (
    <>
      <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      <div className="container-fluid">
        <div className="row">
          <Sidebar showMenu={showMenu} />
          <main className={`col-md-9 col-lg-10 ms-sm-auto px-md-4`}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
