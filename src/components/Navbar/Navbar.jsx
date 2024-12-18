import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BiCameraMovie } from "react-icons/bi";
function Navbar() {
    const [sidebar, setSidebar] = React.useState(false);
    const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
    <IconContext.Provider value={{ color: "#fff" }}>

        <div className="navbar" >
            <Link to='#' className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <div className="logo"><Link to='/home' ><BiCameraMovie style={{color: "gold"}} /><span>MOVIEZONE</span></Link></div>
            <div><p>Movies</p></div>
            <div><p>Series</p></div>
            <div><p>Documentaries</p></div>
            <div className="header-actions">
                <button className="icon-button">
                    <Link style={{ margin: '5px', padding: '0px' }} to='/search'>
                        <FaIcons.FaSearch />
                    </Link>
                </button>
                <button className="icon-button">
                    <Link>
                        <IoIosNotificationsOutline />
                    </Link>
                </button>
                <button className="icon-button">
                    <Link>
                        <IoPersonCircleOutline />
                    </Link>
                </button>
            </div>

        </div> 

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} >
            <ul className="nav-menu-items" >
                <li className="navbar-toggle">
                    <Link className="menu-bars" onClick={showSidebar}>
                        <AiIcons.AiOutlineClose />
                    </Link>
                    <div className="logo"><Link to='/home' ><BiCameraMovie style={{color: "gold"}} /><span>MOVIEZONE</span></Link></div>
                </li>
                {SidebarData.map((item, index)=>{
                    return(
                        <li key={index} className={item.cName} >
                            <Link to={item.path}>
                                {item.icon} &nbsp;&nbsp;
                                <span>{item.title}</span>
                            </Link>

                        </li>
                    );
                })}
            </ul>
        </nav>
    </IconContext.Provider>
    </>
  );
}
export default Navbar;