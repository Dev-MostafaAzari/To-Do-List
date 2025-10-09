import React from 'react';
import { animate, motion } from "framer-motion";
import "../../styles/HomePage.css";
import HomePic from "../../assets/HomePic.jpg";

const SlideTextVariant =
{
    initial: {
        x: 0
    },
    animate: {
        x: -4000,
        transition: {
            duration: 60,
            repeat: Infinity,
            repeatType: "mirror",
        }
    },

}

const HomeItemsVariants = {
    initial:{
        x:-300,
        opacity:0,
    },
    animate:{
        x:0,
        opacity:1,
        transition:{
            type:"spring",
            stiffness:100,
        }
    },
}

const HomePage = () => {
    return (
        <div className="HomePage">
            <motion.div variants={HomeItemsVariants} initial="initial" whileInView="animate" className="HomeWrapper">
                <motion.div variants={HomeItemsVariants} className="TextHomeContainer">
                    <h1>To do list</h1>
                    <p>See and manage your daily <b>To Do List!</b></p>
                </motion.div>
                <motion.div variants={HomeItemsVariants} className="ImgHomeContainer">
                    <img src={HomePic} alt="ToDoPic" />
                </motion.div>
            </motion.div>
            <motion.div variants={SlideTextVariant} animate="animate" className="SlidingText">
                <p>Believe You Can and You are Half Way there </p>
            </motion.div>
        </div>
    )
}

export default HomePage;