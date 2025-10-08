import React from 'react';
import {motion} from "framer-motion";
import "../../styles/Navbar.css";
import Sidebar from './Sidebar/Sidebar';
import Facebook from "../../assets/facebook.png";
import Instagram from "../../assets/instagram.png";



const Navbar =()=>{
    return(
        <div className="Navbar">
            <Sidebar/>
            <div className="NavbarWrapper">
                <h1>Dev Mostafa</h1>
                <div className="Social">
                    <a href='#'><img src={Facebook} alt="facebook"/></a>
                    <a href='#'><img src={Instagram} alt="instagram"/></a>
                </div>
            </div>
            
        </div>
    )
}

export default Navbar;