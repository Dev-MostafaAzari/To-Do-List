import React from 'react';
import {motion} from "framer-motion";
import "../../styles/ToDoList.css";


const DoList = ()=>{
    return(
        <div className="ToDoList">
            <div className="ToDoListWrapper">
                <div className="ListHeader">
                    <h1>Your ToDo List</h1>
                </div>
                <div className="DoLists">
                    <div className="ToDoItem">
                        <p>Send hello to your friends</p>
                        <div className="TodoButton">
                            <button></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DoList;