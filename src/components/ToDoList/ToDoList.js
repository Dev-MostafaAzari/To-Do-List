import React, { useState } from 'react';
import { motion } from "framer-motion";
import "../../styles/ToDoList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faTrash } from '@fortawesome/free-solid-svg-icons';

const ToDoListVariants = {
    initial:{
        x:-200,
        opacity:0,
    },
    animate : {
        x:0,
        opacity:1,
        transition:{
            duration:0.5
        }
    }

};

const AddTaskVariants = {
    initial:{
        opacity:0,
        display:"none",
    },
    IsTrue:{
        opacity:1,
        display:"block",
    },
    IsFalse:{
        opacity:0,
        dispaly:"none",
    },
}



const DoList = () => {

    const [addTask,setAddTask]=useState(false);

    return (
        <div className="ToDoList">
            <motion.div variants={ToDoListVariants} initial="initial" animate="animate" className="ToDoListWrapper">
                <div className="ListHeader">
                    <h1>Your ToDo List</h1>
                </div>
                <div className="DoLists">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>ToDo Item</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>send hello to your friends</td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>send hello to your friends</td>
                                <td><input type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>send hello to your friends</td>
                                <td><input type="checkbox" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="buttons">
                    <button onClick={()=>setAddTask(prev => !prev)}>Add Task</button>
                </div>
                <motion.div variants={AddTaskVariants} animate={addTask ? "IsTrue" : "IsFalse"} initial="initial" transition={{duration:0.3}} className="AddTaskWrapper">
                    <motion.div variants={AddTaskVariants} className="AddTask">
                        <div className="AddTaskCloseBtn">
                            <button onClick={()=>setAddTask(prev => !prev)}><FontAwesomeIcon icon={faClose} /></button>
                        </div>
                        <h1>Add New Task</h1>
                        <form className="AddTaskInput">
                            <input type="text" placeholder="Task Name" />
                            <input type="number" placeholder="UserID" />
                            <button type="submit">Add Task</button>
                        </form>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}


export default DoList;