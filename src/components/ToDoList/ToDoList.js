import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import "../../styles/ToDoList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector,useDispatch } from 'react-redux';
import { axiosGetTodo,axiosAddTask } from '../../features/TodoList/todolistSlice';
import { getTodo,getUserID,IsAddTask} from '../../features/TodoList/todolistSlice';

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
    const {loading,todo,addTodo,completed,addUserId,error,addTask} = useSelector(state=>state.todoList);

    useEffect(()=>{
        dispatch(axiosGetTodo());
    },[]);

    const HandleAddTask = ()=>{
        dispatch(IsAddTask());
    };

    const SubmitTaskHandle = ()=>{
        dispatch(axiosAddTask({addUserId,addTodo,completed}));
    }

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
                                <th>No.</th>
                                <th>ToDo Item</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todo?.todos?.map((element) =>         /* bayad be in shek map mikardim chon dar todo yek object be name todos darim */
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.todo}</td>
                                    <td><input type="checkbox" /></td>
                                </tr>
                            )}
                        </tbody>
                    </table>}
                </div>
                <div className="buttons">
                    <button onClick={HandleAddTask}>Add Task</button>
                </div>
                <motion.div variants={AddTaskVariants} animate={addTask ? "IsTrue" : "IsFalse"} initial="initial" transition={{duration:0.3}} className="AddTaskWrapper">
                    <motion.div variants={AddTaskVariants} className="AddTask">
                        <div className="AddTaskCloseBtn">
                            <button onClick={HandleAddTask}><FontAwesomeIcon icon={faClose} /></button>
                        </div>
                        <h1>Add New Task</h1>
                        <form className="AddTaskInput">
                            <input type="text"  onChange={(e)=>{dispatch(getTodo(e.target.value))}} placeholder="Task Name" />
                            <input type="number"  onChange={(e)=>{dispatch(getUserID(+e.target.value))}} placeholder="UserID" />
                            <button onClick={SubmitTaskHandle} type="button">Add Task</button>
                        </form>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}


export default DoList;