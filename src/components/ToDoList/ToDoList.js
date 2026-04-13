import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import "../../styles/ToDoList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faRemove, faTrash, faUserCheck, faUserEdit, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { useSelector,useDispatch } from 'react-redux';
import { AddTodo,AddTask,DeleteTodo,CancelEdit,ChangeEdit,TaskDone} from '../../features/TodoManual/todoManualSlice';
import Timer from './Timer/Timer';
import Completed from './Completed/Completed';
import AllTodos from './AllTodos/AllTodos';

const ToDoListVariants = {
    initial:{
        opacity:0,
    },
    animate : {
        opacity:1,
        transition:{
            duration:0.5
        }
    }

};

const AddTaskVariants = {    //AddTask variants for AddTask element
    initial:{
        opacity:0,
        display:"none",
    },
    IsTrue:{
        opacity:1,
        display:"flex",
    },
    IsFalse:{
        opacity:0,
        dispaly:"none",
    },
};

const TaskTabsVariants = {      //variants for Tabs Motions
    IsTrue:{
        backgroundColor:"Orange",
        color:"Black",
    },
    IsFalse:{
        backgroundColor:"Transparent",
        color:"White",
    },
};

const DoList = () => {

    const dispatch = useDispatch();
    const {loading , addTask,TodoList} = useSelector(state=> state.manualTodo);
    const [isinTodo,setIsintodo]=useState(true);
    const [todo,setTodo]=useState({
        Title:"",
        Descript:"",
        Priority:"Low",
        id:"",
    });

    const [edit,setEdit]=useState([{
        Title:"",
        Descript:"",
        Priority:"",
    }]);

    const AddTaskHandle = () => { 
        dispatch(AddTask());
    };

    const AddTodoHandle = (todo,e) =>{
        e.preventDefault();
        dispatch(AddTodo(todo));
        setTodo({...todo , Title:"" , Descript:"", Priority:"" });
        AddTaskHandle();
    };

    const DeleteItem = (id) =>{
        dispatch(DeleteTodo(id));   //giving each element id to this method 
        dispatch(CancelEdit(id));
    };

    const handleChangeEdit=(data)=>{
        dispatch(ChangeEdit(data));
        //setEdit({...edit , Title:"",DeadLine:"",Status:""}); 
    };

    return (
        <div className="ToDoList">
            <motion.div variants={ToDoListVariants} initial="initial" animate="animate" className="ToDoListWrapper">
                <div className="ListHeader">
                    <h1>Your ToDo List</h1>
                </div>
                <div className="TodoContainer">
                    {/* <ul className="TodoTabs">
                        <li className="MenuLi"><span>Menu</span></li>
                        <div className="TabsBtns">
                            <motion.li variants={TaskTabsVariants} animate={isinTodo ? "IsTrue" : "IsFalse"} ><motion.button variants={TaskTabsVariants}  className="TodoList" onClick={()=>setIsintodo(true)}>TaskList</motion.button></motion.li>
                            <motion.li variants={TaskTabsVariants} animate={isinTodo ? "IsFalse" : "IsTrue"} ><motion.button variants={TaskTabsVariants}  className="Completed" onClick={()=>setIsintodo(false)}>Completed</motion.button></motion.li>
                        </div>
                    </ul>
                    <div className="DoLists">  
                        {isinTodo ? <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Expiry</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {TodoList.map((e)=>(<tr key={e.id}>
                                    <td>{e.isEdit ? <input className="EditInputTitle" type="text"  onChange={(e)=>setEdit({...edit, Title:e.target.value})} placeholder={e.Title} /> : e.Title}</td>
                                    <td className="TimerTD">{e.isEdit ? <input className="EditInputDeadLine" type="number"  onChange={(e)=>setEdit({...edit, DeadLine:e.target.value})} placeholder={e.DeadLine} /> : <Timer initialTime={e.DeadLine}/>}</td>
                                    <td>{e.isEdit ? <input className="EditInputStatus" type="text"  onChange={(e)=>setEdit({...edit, Status:e.target.value})} placeholder={e.Status} /> : e.Status}</td>
                                    <td>
                                        <div className="TodoOprations">{e.isEdit ?<><button className="ChangeEdit" onClick={()=>handleChangeEdit({id:e.id,data:edit})}><FontAwesomeIcon icon={faCheck}/></button><button className="CancelEdit" 
                                            onClick={()=>{dispatch(CancelEdit(e.id))}}><FontAwesomeIcon icon={faRemove}/></button></> : <><button className="EditTodo" title="Done" onClick={()=>{dispatch(TaskDone(e.id))}}><FontAwesomeIcon icon={faUserCheck}/></button><button className="EditTodo" title="Edit" onClick={()=>{dispatch(CancelEdit(e.id))}}><FontAwesomeIcon icon={faUserEdit}/></button><button 
                                            onClick={()=>DeleteItem(e.id)} title="Remove" className="EditTodo"><FontAwesomeIcon icon={faUserMinus}/></button></>}
                                        </div>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>:<Completed/>}
                    </div> */}
                    <div className="DoLists">
                        <div className="TodosTabsBtn">
                            {isinTodo ? <button className="disabledTodosTabBtn" disabled >All Tasks</button>:<button className="TodosTabBtn" onClick={()=>{setIsintodo(true)}}>All Tasks</button>}
                            {isinTodo === true ? <button className="TodosTabBtn" onClick={()=>{setIsintodo(false)}}>Completed Tasks</button>:<button className="disabledTodosTabBtn" disabled>Completed Tasks</button>}
                        </div>
                        {isinTodo ? 
                            <AllTodos />
                            :
                            <Completed/>
                        }
                    </div>
                </div>
                <div className="buttons">
                    <motion.button initial={{background:"lightblue"}} whileHover={{background:"darkblue",color:"white"}} onClick={AddTaskHandle}>New Task</motion.button>
                </div>
                <motion.div variants={AddTaskVariants} animate={addTask ? "IsTrue" : "IsFalse"} initial="initial" transition={{duration:0.3}} className="AddTaskWrapper">  {/* addTask from Slice State */}
                    <motion.div variants={AddTaskVariants} className="AddTask">
                        <div className="AddTaskCloseBtn">
                            <button onClick={AddTaskHandle}><FontAwesomeIcon icon={faClose} /></button>
                        </div>
                        <h1>Create New Task</h1>
                        <form onSubmit={(e)=>AddTodoHandle(todo,e)} className="AddTaskInput">
                            <input type="text" value={todo.Title} required onChange={(e) => setTodo({...todo , Title:e.target.value , id:Math.floor(Math.random()*10000000)})} placeholder="Task Name" />   {/* creating a random Id while creating Title for element */}
                            <input type="number" max={48} min={1} value={todo.Descript} required onChange={(e) => setTodo({...todo , Descript:e.target.value})} placeholder="FinishTime(hr)" />
                            {/* <input list="priority" required value={todo.Status} onChange={(e)=> setTodo({...todo , Status : e.target.value})} placeholder="Priority"/>
                            <datalist id="priority">
                                <option value="Low">Low</option>
                                <option value="Mid">Mid</option>
                                <option value="High">High</option>
                            </datalist> */}
                            <select id="priority" onChange={(e)=> setTodo({...todo , Priority : e.target.value})}>
                                <option value="Low">Low</option>
                                <option value="Mid">Mid</option>
                                <option value="High">High</option>
                            </select> 
                            <button type="submit">Create Task</button>
                        </form>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
};


export default DoList;