import React,{useState} from 'react';
import "../../../styles/Completed.css";
import { useDispatch, useSelector } from 'react-redux';
import { faTrashCan, faUndo } from '@fortawesome/free-solid-svg-icons';
import { TaskUnDone,CompleteDelete } from '../../../features/TodoManual/todoManualSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Completed = ()=>{
    const dispatch = useDispatch();
    const {CompletedTasks}=useSelector(state=>state.manualTodo);
    const [deleteCompletedAlert,setDeleteCompletedAlert]=useState(false);
    const [delCompletedId,setDelCompletedId]=useState();

    return(
        <div className="CompletedTasksContainer">
            <div className="CompletedTasksWrapper">
                {CompletedTasks.length === 0 ? 
                    <div className="EmptyCompletedTasks">
                        <p>No Task Completed Yet ☹</p>
                    </div>
                    : 
                    <div className="CompletedList">
                        {CompletedTasks.map((item) => 
                            <div className="CompletedTaskCard">
                                <div className="CompletedTaskCardTitle">
                                    <p className="CompletedCardTitle">{item.Title}</p>
                                </div>
                                <div className="CompletedTaskDescript">
                                    <p className="CompletedCardDiscript"><span>Discription :</span>{item.Descript} </p>
                                </div>
                                <span className="CompletedCardSpan">
                                    Done
                                </span>
                                <div className="CompletedTaskOparationBtns">
                                    <button id="UndoneTask" title="Undone" onClick={()=>{dispatch(TaskUnDone(item.id))}}><FontAwesomeIcon icon={faUndo}/></button>
                                    <button id="DeleteCompleted" title="Delete" onClick={()=>{setDeleteCompletedAlert(prev => prev=!prev);setDelCompletedId(item.id)}}><FontAwesomeIcon icon={faTrashCan}/></button>
                                </div>    
                            </div>
                        )}
                        {deleteCompletedAlert ? 
                            <div className="DeleteCompletedTask">
                                <div className="DeleteCompletedTaskContainer">
                                    <p>Are you sure about deleting this task?😧</p>
                                    <div className="DeleteCompletedBtns">
                                        <button id="CancelDelete" onClick={()=>{setDeleteCompletedAlert(prev => prev=!prev)}}>Cancel</button>
                                        <button id="ConfirmDelete" onClick={()=>{dispatch(CompleteDelete(delCompletedId));setDeleteCompletedAlert(prev=>prev=!prev)}}>Delete</button>
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
    )
};




export default Completed;


