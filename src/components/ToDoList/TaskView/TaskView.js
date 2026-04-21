import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/TaskView.css";
import { useSelector , useDispatch } from "react-redux";
import { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { SubmitEditViewTask, ToggleIsInTaskView } from "../../../features/TodoManual/todoManualSlice";

const TaskView = () => {
    const {ViewTask} = useSelector(state => state.manualTodo);
    const [isViewEdit,setIsViewEdit]=useState(false);
    const [editedData,setEditedData] = useState({Title:"",Descript:"",Priority:"Low",id:ViewTask.id});
    const dispatch = useDispatch();
    let id = ViewTask.id ;
    const EditSubmitHandle = (e)=> {
        e.preventDefault();
        dispatch(SubmitEditViewTask(editedData));
        setIsViewEdit(prev=>prev=!prev);
    }


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
                    <form className="TaskViewContent" onSubmit={(e)=>EditSubmitHandle(e)}>
                        <div className="ViewTitleAndPriorityContainer">
                            <div className="TitleInputContainer">
                                <span className="ViewTitle">Title :</span>
                                <input className="TitleAndPriorityInput" type="text" value={editedData.Title} onChange={(e)=>{setEditedData({...editedData , Title:e.target.value})}} required placeholder="Enter New Title"/>
                            </div>
                            <div className="PriorityInputContainer">
                                <span className="ViewPriority">Priority :</span>
                                <select className="TitleAndPriorityInput" value={editedData.Priority} onChange={(e)=>{setEditedData({...editedData , Priority:e.target.value})}}>
                                    <option value="Low">Low</option>
                                    <option value="Mid">Mid</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>
                        <div className="ViewDiscriptAndOperations">
                            <textarea className="TaskViewTodoDiscript" placeholder="Add New Discription :" value={editedData.Descript} onChange={(e)=>{setEditedData({...editedData , Descript:e.target.value})}}/>
                        </div>
                        <div className="EditOperationBtnsContainer">
                            <button className="CancleEdit" onClick={()=>{setIsViewEdit(prev => prev=!prev);setEditedData({Title:"",Descript:"",Priority:"Low",id:ViewTask.id})}}>Cancle</button>
                            <button className="SaveEdit" type="submit">Save</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}
 
export default TaskView;