import React from 'react';
import {motion} from "framer-motion";
import "../../styles/ToDoList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faTrash } from '@fortawesome/free-solid-svg-icons';


const DoList = ()=>{
    return(
        <div className="ToDoList">
            <div className="ToDoListWrapper">
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
                                <td><input type="checkbox"/></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>send hello to your friends</td>
                                <td><input type="checkbox"/></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>send hello to your friends</td>
                                <td><input type="checkbox"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="buttons">
                    <button>Add Task</button>
                </div>
                <div className="AddTask">
                    <div className="AddTaskCloseBtn">
                        <button><FontAwesomeIcon icon={faClose}/></button>
                    </div>
                    <h1>Add New Task</h1>
                    <form className="AddTaskInput">
                        <input type="text" placeholder="Task Name"/>
                        <input type="number" placeholder="UserID"/>
                        <button type="submit">Add Task</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default DoList;