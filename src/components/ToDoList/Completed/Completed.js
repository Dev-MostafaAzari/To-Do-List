import React,{useState} from 'react';
import "../../../styles/Completed.css";
import { useDispatch, useSelector } from 'react-redux';
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { TaskUnDone,CompleteDelete } from '../../../features/TodoManual/todoManualSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Completed = ()=>{
    const dispatch = useDispatch();
    const {CompletedTasks}=useSelector(state=>state.manualTodo);


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
                                    <p className="CompletedCardTitle"><span>Title :</span>{item.Title}</p>
                                </div>
                                <div className="CompletedTaskDescript">
                                    <p className="CompletedCardDiscript"><span>Discription :</span>{item.Descript} </p>
                                </div>
                                <span className="CompletedCardSpan">
                                    Done
                                </span>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
};




export default Completed;


