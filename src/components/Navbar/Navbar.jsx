import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import * as FaIcons from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BiCameraMovie } from "react-icons/bi";


function Navbar(props) {
    const [search, setSearch] = React.useState("");
    const navigate = useNavigate();
    function handleSearch(e) {
        navigate(`/search/${e}`);
        console.log("searched for", e);
    }
  return (
    <>
    <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar" >
             <div><Link style={{textDecoration: "none"}} to='/movies'><p>Movies</p></Link></div>
            <div><Link style={{textDecoration: "none"}} to='/series'><p>Series</p></Link></div>
            <div><Link style={{textDecoration: "none"}} to='/documentaries'><p>Documentaries</p></Link></div>
            <div className="header-actions">
                <button className="icon-button">
                    <div className="search">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="what do you want to see?" />
                                <button
                                    onClick={() => handleSearch(search)}
                                    style={{ margin: '5px', padding: '0px', background: 'none', border: 'none' }}
                                >
                                    <FaIcons.FaSearch />
                                </button>
                    </div >
                    
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
        <nav className='nav-menu active' >
            <ul className="nav-menu-items" >
                <li className="navbar-toggle">
                    <div className="logo"><Link to='/home' ><BiCameraMovie style={{color: "gold"}} /><span>MOVIEZONE</span></Link></div>
                </li>
                {SidebarData.map((item, index)=>{
                    return(
                        <li key={index} className={item.cName} >
                            <Link to={item.path} >
                                {item.icon} &nbsp; &nbsp;
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
