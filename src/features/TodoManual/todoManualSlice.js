import { createSlice } from "@reduxjs/toolkit";


const savedData = JSON.parse(localStorage.getItem("Todos") || "{}")   //Saved Todos On LocalStorage

const initialState = {
    addTask : false,
    isInTaskView : false,
    TodoList : savedData.TodoList, //All Tasks
    CompletedTasks:savedData.CompletedTasks,   // Completed Tasks
    ViewTask : {}, // selectedTaskforView                                                                                                                                
};


const ManualSlice = createSlice({
    name:"ManualTodo",
    initialState,
    reducers:{
        // Create New Task
        AddTodo:(state,action)=>{   
            state.TodoList.push(action.payload);
        },
        // AddTask status
        AddTask:(state)=>{      
            state.addTask = !state.addTask;
        },
        DeleteTodo:(state,action)=>{
            state.TodoList.splice(state.TodoList.findIndex(item => item.id === action.payload),1);  //delete selected task
        },
        TaskDone:(state,action)=>{
            state.CompletedTasks.push(state.TodoList.find(item => item.id === action.payload));
            state.TodoList.splice(state.TodoList.findIndex(item => item.id === action.payload),1);
        },
        //Change Completed Task To UnComplete
        TaskUnDone:(state,action)=>{
            state.TodoList.push(state.CompletedTasks.find(item => item.id === action.payload));
            state.CompletedTasks.splice(state.CompletedTasks.findIndex(item => item.id === action.payload),1);
        },
        CompleteDelete:(state,action)=>{
            state.CompletedTasks.splice(state.CompletedTasks.findIndex(item => item.id === action.payload),1);
        },
        AscendSort:(state)=>{
           const high =  state.TodoList.filter(item=>item.Priority=== "High");
           const mid = state.TodoList.filter(item => item.Priority=== "Mid");
           const low = state.TodoList.filter(item => item.Priority=== "Low");
           state.TodoList = (low.concat(mid)).concat(high);
        },
        DescendSort:(state)=>{
            const high =  state.TodoList.filter(item=>item.Priority=== "High");
            const mid = state.TodoList.filter(item => item.Priority=== "Mid");
            const low = state.TodoList.filter(item => item.Priority=== "Low");
            state.TodoList = (high.concat(mid)).concat(low);
        },
        ViewTask:(state,action)=>{
            state.ViewTask = state.TodoList.find(item => item.id === action.payload);
            state.isInTaskView = true; 
        },
        ToggleIsInTaskView:(state)=>{
            state.isInTaskView = !state.isInTaskView;
        },
        SubmitEditViewTask:(state,action)=>{
            state.ViewTask = action.payload;
            state.TodoList = state.TodoList.map(item => item.id === action.payload.id ? {...item , ...action.payload}:item);
        }
    },
});


export default ManualSlice.reducer;
export const {AddTodo,AddTask,DeleteTodo,CancelEdit,ChangeEdit,TaskDone,TaskUnDone,CompleteDelete,AscendSort,DescendSort,ViewTask,ToggleIsInTaskView,SubmitEditViewTask} = ManualSlice.actions;