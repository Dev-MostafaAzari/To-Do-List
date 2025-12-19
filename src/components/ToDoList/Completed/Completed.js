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
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {CompletedTasks.map((element)=>(<tr key={element.id}>
                    <td>{element.Title}</td>
                    <td>Done</td>
                    <td>
                        <div className="CompleteTabOperationDiv">
                            <button className="CompleteTabOperationBtns" title="UnDone" onClick={()=>{dispatch(TaskUnDone(element.id))}}><FontAwesomeIcon icon={faUndo}/></button><button className="CompleteTabOperationBtns" title="Delete"
                            onClick={()=>{dispatch(CompleteDelete(element.id))}}><FontAwesomeIcon icon={faTrash}/></button>
                        </div>
                    </td>
                </tr>))}
            </tbody>
        </table>
    )
};




export default Completed;


