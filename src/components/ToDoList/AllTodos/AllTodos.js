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
                    <h2 className="EmptyTodosTitle">There is no Task Here</h2>
                    :
                    <div className="AllTodosList">
                        {TodoList.map((item) => 
                            <div className="AllTodoTaskCard">
                                <div className="AllTodoTaskCardTitle">
                                    <h3 className="AllTodoCardTitle">Title : {item.Title}</h3>
                                </div>
                                <div className="AllTodoTaskDescript">
                                    {item.Descript}
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