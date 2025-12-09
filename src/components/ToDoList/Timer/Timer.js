import React, { useEffect, useState } from 'react';
import "../../../styles/Timer.css";
import { motion } from 'framer-motion';

const TimerVariants = {
    Full:{
        backgroundColor:"Green",
    },
    Half:{
        backgroundColor:"Lightblue",
    },
    End:{
        backgroundColor:"Red",
    },
}


const Timer = ({initialTime})=>{   //deadline Props
    const [time,setTime]=useState(initialTime);
    const [isRunning,setIsRunning]=useState(false);
    const [timerColor,setTimerColor]=useState("");

    useEffect(()=>{
        setIsRunning(true);
        let interval = null;
        if(isRunning && time > 0)
        {
            interval = setInterval(()=>{       //every 6 sec
                setTime(prev => prev-=1/3600);
            },60);
            if(Math.trunc(time/initialTime*100)<=100 && Math.trunc(time/initialTime*100)>50)
            {
                setTimerColor("Full");
            };
            if(Math.trunc(time/initialTime*100)<=50 && Math.trunc(time/initialTime*100)>30)
            {
                setTimerColor("Half");
            };
            if(Math.trunc(time/initialTime*100)<=30 && Math.trunc(time/initialTime*100)>=0)
            {
                setTimerColor("End");
            };
            
        };
        if(time===0)
        {
            clearInterval(interval);
            setIsRunning(false);
        };
        
        return () => clearInterval(interval);

    },[isRunning,time])




    return(
        <div className="TimerWrapper">
            <motion.div variants={TimerVariants} initial={{backgroundColor:"green"}}  animate={timerColor}  className="TimerBorder">
                <span className="Time">{Math.trunc(time/initialTime*100) + "%"}</span>
            </motion.div>
        </div>
    )
}



export default Timer;