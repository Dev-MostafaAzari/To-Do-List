import React from 'react';
import {motion} from "framer-motion";
import "../../styles/Navbar.css";
import Sidebar from './Sidebar/Sidebar';
import Github from "../../assets/github.png";
import Instagram from "../../assets/instagram.png";



const Navbar =()=>{
    return(
        <div className="Navbar">
            <Sidebar/>
            <div className="NavbarWrapper">
                <h1>Dev Mostafa</h1>
                <div className="Social">
                    <a href="https://github.com/Dev-MostafaAzari" target="_blank"><img src={Github} alt="facebook"/></a>
                    <a href="https://instagram.com/mostafazari224" target="_blank"><img src={Instagram} alt="instagram"/></a>
                </div>
            </div>
            
        </div>
    )
}

export default Navbar;