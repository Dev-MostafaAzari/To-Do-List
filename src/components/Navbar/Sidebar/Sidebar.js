import React, { useState } from 'react';
import {motion} from "framer-motion";
import "../../../styles/Sidebar.css";
import ToggleButton from '../ToggleButton/ToggleButton';


const Sidebar = ()=> {
    const [open,setOpen]=useState(false);



    return(
        <div className="Sidebar">
            <div className="bg">
                <div className="Links">
                    <a href=''>Login</a>
                    <a href=''>To Do List</a>
                    <a href=''>Logout</a>
                </div>
                <ToggleButton setOpen={setOpen}/>
            </div>
            
        </div>
    )
}

export default Sidebar;
