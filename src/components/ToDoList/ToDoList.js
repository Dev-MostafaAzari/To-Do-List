import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import "../../styles/ToDoList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faRemove, faTrash, faUserEdit, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { useSelector,useDispatch } from 'react-redux';
import { AddTodo,AddTask,DeleteTodo,CancelEdit,ChangeEdit} from '../../features/TodoManual/todoManualSlice';
import Timer from './Timer/Timer';

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
};

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
};

const DoList = () => {

    const dispatch = useDispatch();
    const {loading , addTask,TodoList} = useSelector(state=> state.manualTodo);
    const [todo,setTodo]=useState({
        Title:"",
        DeadLine:"",
        Status:"",
        id:"",
    });

    const [edit,setEdit]=useState([{
        Title:"",
        DeadLine:"",
        Status:"",
    }]);

    const AddTaskHandle = () => { 
        dispatch(AddTask());
    };

    const AddTodoHandle = (todo,e) =>{
        e.preventDefault();
        dispatch(AddTodo(todo));
        setTodo({...todo , Title:"" , DeadLine:"", Status:"" });
        AddTaskHandle();
    };

    const DeleteItem = (id) =>{
        dispatch(DeleteTodo(id));   //id hammon id elemnt dar array hast ke be in tabe dar redux pas midim
        dispatch(CancelEdit(id));
    };

    const handleChangeEdit=(data)=>{
        dispatch(ChangeEdit(data));
        //setEdit({...edit , Title:"",DeadLine:"",Status:""});   //state ro khali mikonim ta darsoorat edit bdoon ezafe shodan new value dar input ha "" vared shavad
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
                                <td><div className="TodoOprations">{e.isEdit ?<><button className="ChangeEdit" onClick={()=>handleChangeEdit({id:e.id,data:edit})}><FontAwesomeIcon icon={faCheck}/></button><button className="CancelEdit" onClick={()=>{dispatch(CancelEdit(e.id))}}><FontAwesomeIcon icon={faRemove}/></button></> : <><button className="EditTodo" onClick={()=>{dispatch(CancelEdit(e.id))}}><FontAwesomeIcon icon={faUserEdit}/></button><button onClick={()=>DeleteItem(e.id)} className="EditTodo"><FontAwesomeIcon icon={faUserMinus}/></button></>}</div></td>
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
                            <input type="text" value={todo.Title} required onChange={(e) => setTodo({...todo , Title:e.target.value , id:Math.floor(Math.random()*10000000)})} placeholder="Task Name" />   {/* hamzaman yek id random ham midim */}
                            <input type="number" max={48} min={1} value={todo.DeadLine} required onChange={(e) => setTodo({...todo , DeadLine:e.target.value})} placeholder="FinishTime(hr)" />
                            <input type="text" value={todo.Status} required onChange={(e) => setTodo({...todo , Status:e.target.value})} placeholder="status" />
                            <button type="submit">Add Task</button>
                        </form>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
};


export default DoList;