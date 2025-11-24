import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import "../../styles/ToDoList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector,useDispatch } from 'react-redux';
import { AddTodo,AddTask } from '../../features/TodoManual/todoManualSlice';

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

const LoadingAnimationVariants = {
    OuterRingInit:{
        scale:1,
        
    },
    OuterRingAnim : {
        scale:1.5,
        transition:{
            type:"mirror",
            duration:1,
            repeat:Infinity,
        }
    },
    InnerRingInit:
    {
        scale:2,
    },
    InnerRingAnim:{
        scale:0.8,
        transition:{
            type:"mirror",
            duration:1,
            repeat:Infinity,
        }
    },
}

const DoList = () => {

    const dispatch = useDispatch();
    const {loading , addTask,TodoList} = useSelector(state=> state.manualTodo);
    const [todo,setTodo]=useState({
        Title:"",
        DeadLine:"",
        Status:""
    });

    const AddTaskHandle = () => { 
        dispatch(AddTask());
    };

    const AddTodoHandle = (todo,e) =>{
        e.preventDefault();
        dispatch(AddTodo(todo));
        setTodo({...todo , Title:"" , DeadLine:"", Status:"" });
        AddTaskHandle();
    };

    return (
        <div className="ToDoList">
            <motion.div variants={ToDoListVariants} initial="initial" animate="animate" className="ToDoListWrapper">
                <div className="ListHeader">
                    <h1>Your ToDo List</h1>
                </div>
                <div className="DoLists">   {/* dar inja yek loding dorost kardam ke ta zamanike loading hast elemnt loading ro nshoon bde va bad az daryaft data az api oon ro hide va data ro nshoon bde */}
                    {loading ? <motion.div variants={LoadingAnimationVariants} initial="OuterRingInit" animate="OuterRingAnim" className="LoadingAnimation"><motion.div variants={LoadingAnimationVariants} initial="InnerRingInit" animate="InnerRingAnim" className="LoadingAnimation2"></motion.div></motion.div> : <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>DeadLine</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TodoList.map((e)=>(<tr>
                                <td>{e.Title}</td>
                                <td>{e.DeadLine}Days</td>
                                <td>{e.Status}</td>
                            </tr>))}
                        </tbody>
                    </table>}
                </div>
                <div className="buttons">
                    <button onClick={AddTaskHandle}>Add Task</button>
                </div>
                <motion.div variants={AddTaskVariants} animate={addTask ? "IsTrue" : "IsFalse"} initial="initial" transition={{duration:0.3}} className="AddTaskWrapper">  {/* dar inja addTask state dakhel redux hast */}
                    <motion.div variants={AddTaskVariants} className="AddTask">
                        <div className="AddTaskCloseBtn">
                            <button onClick={AddTaskHandle}><FontAwesomeIcon icon={faClose} /></button>
                        </div>
                        <h1>Add New Task</h1>
                        <form onSubmit={(e)=>AddTodoHandle(todo,e)} className="AddTaskInput">
                            <input type="text" value={todo.Title}  onChange={(e) => setTodo({...todo , Title:e.target.value})} placeholder="Task Name" />   
                            <input type="number" value={todo.DeadLine} onChange={(e) => setTodo({...todo , DeadLine:e.target.value})} placeholder="DeadLine" />
                            <input type="text" value={todo.Status}  onChange={(e) => setTodo({...todo , Status:e.target.value})} placeholder="status" />
                            <button type="submit">Add Task</button>
                        </form>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}


export default DoList;