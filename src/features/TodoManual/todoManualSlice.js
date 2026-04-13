import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading : false,
    addTask : false,
    TodoList : [{Title:"Say Hello to the World",Descript:"My first Task",Priority:"High",id:Math.floor(Math.random()*10000000),isEdit:false}], //bejay inke baray isEdit yek state joda tarif konim onn ro dar inja tarif mikonim
    CompletedTasks:[{Title:"Get To this point",Descript:"nothing",Priority:"low",id:Math.floor(Math.random()*10000000),isEdit:false}],                                                                                                                                
};


const ManualSlice = createSlice({
    name:"ManualTodo",
    initialState,
    reducers:{
        AddTodo:(state,action)=>{
            state.TodoList.push(action.payload);
        },
        AddTask:(state)=>{
            state.addTask = !state.addTask;
        },
        DeleteTodo:(state,action)=>{
            state.TodoList.splice(state.TodoList.findIndex(item => item.id === action.payload),1);  //ebteda ba findIndex , index {} ro dar array peda mikonim va ba splice delete mikonim
        },
        CancelEdit:(state,action)=>{
            state.TodoList = state.TodoList.map(item=>item.id === action.payload ? {...item , isEdit: !item.isEdit} :item);  //ba in ravesh ke faghat oon item data isEdit taghir mikone
        },
        ChangeEdit:(state,action)=>{
            const {id,data}= action.payload;  //dar inja dota meghdar dar payload darim ke distruct kardim
            state.TodoList = state.TodoList.map(item => item.id === id ? {...item,...data} : item);   //item ke id onn ba id vorodi barabar base ro be data vorodi update mikonim
            state.TodoList = state.TodoList.map(item => item.id === id ? {...item , isEdit: !item.isEdit} :item);
        },
        TaskDone:(state,action)=>{
            state.CompletedTasks.push(state.TodoList.find(item => item.id === action.payload));
            state.TodoList.splice(state.TodoList.findIndex(item => item.id === action.payload),1);
        },
        TaskUnDone:(state,action)=>{
            state.TodoList.push(state.CompletedTasks.find(item => item.id === action.payload));
            state.CompletedTasks.splice(state.CompletedTasks.findIndex(item => item.id === action.payload),1);
        },
        CompleteDelete:(state,action)=>{
            state.CompletedTasks.splice(state.CompletedTasks.findIndex(item => item.id === action.payload),1);
        },
    },
});


export default ManualSlice.reducer;
export const {AddTodo,AddTask,DeleteTodo,CancelEdit,ChangeEdit,TaskDone,TaskUnDone,CompleteDelete} = ManualSlice.actions;