import React, { useState } from 'react';
import { animate, motion } from "framer-motion";
import "../../../styles/Sidebar.css";
import ToggleButton from '../ToggleButton/ToggleButton';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    const [open, setOpen] = useState(false);

    const variants = {   //variant baray bg
        open: {

            clipPath: "circle(1800px at 25px 25px)",
            transition: {
                duration: 1,

            }
        },
        close:
        {
            clipPath: "circle(30px at 45px 40px)",
            transition: {
                duration: 0.5,
            }
        },
    };

    const ListVariants = {   //variant baray list ha
        close: {
            y: 100,
            opacity:0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },
        open: {
            y: 0,
            opacity:1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },

    };


    return (
        <div className="Sidebar">
            <motion.div className="bg" variants={variants} animate={open ? "open" : "close"}>
                <motion.div className="Links" variants={ListVariants} animate={open ? "open" : "close"}>
                    <motion.a variants={ListVariants} whileHover={{scale:1.1,transition:{duration:0.3}}} whileTap={{scale:0.9}} onClick={()=>{setOpen(prev=>prev=!prev)}} ><Link to="/To-Do-List">HomePage</Link></motion.a>
                    <motion.a variants={ListVariants} whileHover={{scale:1.1,transition:{duration:0.3}}} whileTap={{scale:0.9}} onClick={()=>{setOpen(prev=>prev=!prev)}}><Link to="/Login">Login</Link></motion.a>
                    <motion.a variants={ListVariants} whileHover={{scale:1.1,transition:{duration:0.3}}} whileTap={{scale:0.9}} onClick={()=>{setOpen(prev=>prev=!prev)}}><Link to="ToDoList">ToDoList</Link></motion.a>
                </motion.div>
                <ToggleButton setOpen={setOpen} open={open} />
            </motion.div>

        </div>
    )
};

export default Sidebar;
