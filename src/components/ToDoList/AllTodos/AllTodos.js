import { useSelector , useDispatch } from "react-redux";
import {DeleteTodo,CancelEdit,ChangeEdit,TaskDone} from "../../../features/TodoManual/todoManualSlice";
import "../../../styles/AllTodos.css";

const AllTodos = (props) => {
    const {TodoList} = useSelector(state => state.manualTodo)
    const dispatch = useDispatch();

    const DeleteItem = (id) =>{
        dispatch(DeleteTodo(id));   //giving each element id to this method 
        dispatch(CancelEdit(id));
    };
    
    const handleChangeEdit=(data)=>{
        dispatch(ChangeEdit(data));
        //setEdit({...edit , Title:"",DeadLine:"",Status:""}); 
    };

    return (
        <div className="AllTodosContainer">
            <div className="AllTodosWrapper">
                {TodoList.length === 0 ?
                    <div className="EmptyTodoContainer">
                        <p className="EmptyTodosTitle">Nothing going on right now ☹</p>
                    </div>    
                    :
                    <div className="AllTodosList">
                        {TodoList.map((item) => 
                            <div className="AllTodoTaskCard">
                                <div className="AllTodoTaskCardTitle">
                                    <p className="AllTodoCardTitle"><span>Title :</span>{item.Title}</p>
                                </div>
                                <div className="AllTodoTaskDescript">
                                    <p className="AllTodoCardDiscript"><span>Discription :</span>{item.Descript} </p>
                                </div>
                                <span className="AllTodoCardSpan">
                                    {item.Status}
                                </span>
                            </div>
                        )}
                    </div>    
                }
            </div>
        </div>
    );
}
 
export default AllTodos;