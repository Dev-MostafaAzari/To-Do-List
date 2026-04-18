import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/TaskView.css";
import { useSelector , useDispatch } from "react-redux";
import { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ToggleIsInTaskView } from "../../../features/TodoManual/todoManualSlice";

const TaskView = () => {
    const {ViewTask,isInTaskView} = useSelector(state => state.manualTodo);
    const [isViewEdit,setIsViewEdit]=useState(false);
    const [editedData,setEeditedData] = useState({Title:"",Descript:"",Priority:"Low"});
    const dispatch = useDispatch();
    let id = ViewTask.id ;
    return (
        <div className="TaskViewContainer">
            <div className="TaskViewWrapper">
                {isViewEdit === false ? 
                    <div className="TaskViewContent">
                        <div className="ViewTitleAndPriorityContainer">
                            <p className="TaskViewTodoTitle"><span className="ViewTitle">Title : </span>{ViewTask.Title}</p>
                            <span className="ViewPriority">Priority : <span style={{color:(ViewTask.Priority === "High" ? "red" : (ViewTask.Priority === "Mid" ? "lightBlue" :"Gray"))}}>{ViewTask.Priority}</span> </span>
                        </div>
                        <div className="ViewDiscriptAndOperations">
                            <p className="TaskViewTodoDiscript"><span className="ViewDescript">Description : </span>{ViewTask.Descript}</p>
                            <div className="ViewOperationsBtn">
                                <button className="ViewEdit" onClick={()=>{setIsViewEdit(prev => prev=!prev)}}>Edit Task</button>
                            </div>
                        </div>
                        <button className="CloseViewBtn" onClick={()=>{dispatch(ToggleIsInTaskView())}}><FontAwesomeIcon icon={faClose}/></button>
                    </div>
                    :
                    <form className="TaskViewContent">
                        <div className="ViewTitleAndPriorityContainer">
                            <span className="ViewTitle">Title : <input type="text" required value={editedData.Title} onChange={(e)=>{setEeditedData({...editedData , Title:e.target.value})}} placeholder="Title"/></span>
                            <span className="ViewPriority">
                                Priority : 
                                <select value={editedData.Priority} onChange={(e)=>{setEeditedData({...editedData , Priority:e.target.value})}}>
                                    <option value="Low">Low</option>
                                    <option value="Mid">Mid</option>
                                    <option value="High">High</option>
                                </select> 
                            </span>
                        </div>
                        <div className="ViewDiscriptAndOperations">
                            <textarea className="TaskViewTodoDiscript" value={editedData.Descript} onChange={(e)=>{setEeditedData({...editedData , Descript:e.target.value})}}/>
                            <div className="ViewOperationsBtn">
                                <button className="CancelEdit" onClick={()=>{setIsViewEdit(prev => prev=!prev)}}>Cancel</button>
                                <button className="SavaEdit" type="submit" onClick={()=>{}}>Save</button>
                            </div>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}
 
export default TaskView;