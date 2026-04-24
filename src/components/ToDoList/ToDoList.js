import {useState } from 'react';
import { motion } from "framer-motion";
import "../../styles/ToDoList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose,faSortAmountAsc, faSortAmountDesc} from '@fortawesome/free-solid-svg-icons';
import { useSelector,useDispatch } from 'react-redux';
import { AddTodo,AddTask,AscendSort,DescendSort} from '../../features/TodoManual/todoManualSlice';
import Completed from './Completed/Completed';
import AllTodos from './AllTodos/AllTodos';
import TaskView from './TaskView/TaskView';

const ToDoListWrapperVariants = {  //Variant baray animation element TodoList Main
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

const AddTaskVariants = {    //Variant hay animation baray AddTask Element
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

const DoList = () => {

    const dispatch = useDispatch();
    const {addTask,isInTaskView} = useSelector(state=> state.manualTodo);
    const [isinTodo,setIsintodo]=useState(true);
    const [todo,setTodo]=useState({
        Title:"",
        Descript:"",
        Priority:"Low",
        id:"",
    });

    const AddTodoHandle = (todo,e) =>{
        e.preventDefault();
        dispatch(AddTodo(todo));
        setTodo({...todo , Title:"" , Descript:"", Priority:"Low" });
        dispatch(AddTask());
    };

    return (
        <div className="ToDoList">
            <motion.div variants={ToDoListWrapperVariants} initial="initial" animate="animate" className="ToDoListWrapper">
                <div className="ListHeader">
                    <h1>Your ToDo List</h1>
                </div>
                <div className="TodoContainer">
                    <div className="DoLists">
                        <div className="TodosTabBtns">
                            <div className="SwitchBtns">
                                {isinTodo ? <button className="disabledTodosTabBtn" disabled >All Tasks</button>:<button className="TodosTabBtn" onClick={()=>{setIsintodo(true)}}>All Tasks</button>}
                                {isinTodo === true ? <button className="TodosTabBtn" onClick={()=>{setIsintodo(false)}}>Completed Tasks</button>:<button className="disabledTodosTabBtn" disabled>Completed Tasks</button>}
                            </div>
                            {isinTodo ? <div className="SortSection">
                                <button title="Ascend" onClick={()=>{dispatch(AscendSort())}}><FontAwesomeIcon icon={faSortAmountDesc}/></button>
                                <button title="Dscend" onClick={()=>{dispatch(DescendSort())}}><FontAwesomeIcon icon={faSortAmountAsc}/></button>
                            </div>:null}
                        </div>
                        {isinTodo ? 
                            <AllTodos isInTaskView={isInTaskView} />
                            :
                            <Completed/>
                        }
                        {isInTaskView ? 
                            <TaskView /> 
                            :
                            null
                        }
                    </div>
                </div>
                <div className="NewTaskBtnContainer">
                    {isInTaskView ? <button style={{background:"lightblue",cursor:"default"}} disabled>New Task</button> : <motion.button initial={{background:"lightblue"}} whileHover={{background:"darkblue",color:"white"}} onClick={()=>{dispatch(AddTask())}}>New Task</motion.button>}
                </div>
                <motion.div variants={AddTaskVariants} animate={addTask ? "IsTrue" : "IsFalse"} initial="initial" transition={{duration:0.3}} className="AddTaskWrapper">  {/* aya form add task ro show kone ya na */}
                    <motion.div variants={AddTaskVariants} className="AddTask">
                        <div className="AddTaskCloseBtn">
                            <button onClick={()=>{dispatch(AddTask())}}><FontAwesomeIcon icon={faClose} /></button>
                        </div>
                        <h1>Create New Task</h1>
                        <form onSubmit={(e)=>AddTodoHandle(todo,e)} className="AddTaskInput">
                            <input type="text" value={todo.Title} required onChange={(e) => setTodo({...todo , Title:e.target.value , id:Math.floor(Math.random()*10000000)})} placeholder="Task Name" />   {/* creating a random Id while creating Title for element */}
                            <input type="text" value={todo.Descript} required onChange={(e) => setTodo({...todo , Descript:e.target.value})} placeholder="Task Discription" />
                            <select id="priority" value={todo.Priority} onChange={(e)=> setTodo({...todo , Priority : e.target.value})}>
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