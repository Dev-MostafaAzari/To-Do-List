import { useSelector , useDispatch } from "react-redux";
import {DeleteTodo,TaskDone, ViewTask} from "../../../features/TodoManual/todoManualSlice";
import "../../../styles/AllTodos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faEye, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const AllTodos = () => {
    const {TodoList} = useSelector(state => state.manualTodo)
    const dispatch = useDispatch();
    const [deleteAlert,setDeleteAlret]=useState(false);
    const [deleteItemId,setDeleteAlertId]=useState();

    const DeleteItem = (id) =>{
        dispatch(DeleteTodo(id));   //need to pass the elements id 
    };
    
    
    return (
        <div className="AllTodosContainer">
            <div className="AllTodosWrapper">
                {TodoList.length === 0 ?
                    <div className="EmptyTodoContainer">
                        <p className="EmptyTodosTitle">Nothing going on right now</p>
                        <p className="EmptyTodosTitle2">Try Create New Task😉</p>
                    </div>    
                    :
                    <div className="AllTodosListMain">
                        <div className="AllTodosList">
                            {TodoList.map((item) => 
                                <div className="AllTodoTaskCard" key={item.id}>
                                    <div className="AllTodoTaskCardTitle">
                                        <p className="AllTodoCardTitle">{item.Title}</p>
                                    </div>
                                    <div className="AllTodoTaskDescript">
                                        <p className="AllTodoCardDiscript"><span>Discription :</span>{item.Descript} </p>
                                        <div className="AllTodoOperationBtns">
                                            <button className="CheckTodo" title="Complete" onClick={()=>{dispatch(TaskDone(item.id))}}><FontAwesomeIcon icon={faCheckSquare}/></button>
                                            <button className="DeleteTodo" title="Delete" onClick={()=>{setDeleteAlret(prev=>prev=!prev);setDeleteAlertId(item.id)}}><FontAwesomeIcon icon={faTrashCan}/></button>
                                        </div>    
                                    </div>
                                    <span className="AllTodoCardSpan" style={{background:(item.Priority === "High" ? "red" : (item.Priority === "Mid" ? "Yellow" : "Gray" ))}}>
                                        {item.Priority}
                                    </span>
                                    <button className="ViewThisTask" onClick={()=>{dispatch(ViewTask(item.id))}} title="ViewTask"><FontAwesomeIcon icon={faEye}/></button>
                                </div>
                            )}
                            
                        </div>
                        {deleteAlert ? 
                                <div className="DeleteAlertContainer">
                                    <div className="DeleteConfirmationContainer">
                                        <p>Are you sure about deleting this task?😦</p>
                                        <div>
                                            <button id="CancelDelete" onClick={()=>{setDeleteAlret(prev=>prev=!prev)}}>Cancel</button>
                                            <button id="ConfirmDelete" onClick={()=>{DeleteItem(deleteItemId);setDeleteAlret(prev=>prev=!prev)}}>Delete</button>
                                        </div>
                                    </div>
                                
                                </div>
                                : 
                                null
                        }  
                    </div>  
                }
            </div>
        </div>
    );
}
 
export default AllTodos;