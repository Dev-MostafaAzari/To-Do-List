import React from 'react';
import {motion} from "framer-motion";


const ToggleButton = ({ setOpen }) => {
    return (                                         // state open ro be soorat prop be in dadim
        <button className="ToggleBtn" onClick={() => setOpen(prev => !prev)}>
            <svg width="23" height="23" viewBox='0 0 23 23'>   b{/* bahs svg ro bayad yad bgirim */} 
                <motion.path strokeWidth="3" stroke='black' strokeLinecap='round' variants={{close: {d: "M 2 2.5 L 20 2.5"},open:{d: "M 3 16.5 L 17 2.5"}}}/>  {/* az state ke be inja pass dade shode estefade mikonim */}
                <motion.path strokeWidth="3" stroke='black' strokeLinecap='round' d="M 2 9.423 L 20 9.426" variants={{close:{opacity:1},open:{opacity:0}}}/>
                <motion.path strokeWidth="3" stroke='black' strokeLinecap='round' variants={{close: {d: "M 2 16.346 L 20 16.346"},open:{d: "M 3 2.5 L 17 16.346"}}}/>
            </svg>
            
        </button>   /* style hay in ha dar css parent yani Sidebar.css hast  */
    )
}

export default ToggleButton;