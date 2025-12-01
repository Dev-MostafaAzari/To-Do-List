import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading : false,
    addTask : false,
    TodoList : [{Title:"Say Hello to the World",DeadLine:"3",Status:"inProgress",id:Math.floor(Math.random()*10000000),isEdit:false}], //bejay inke baray isEdit yek state joda tarif konim onn ro dar inja tarif mikonim
                                                                                                                                    
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
            state.TodoList = state.TodoList.map(item=>item.id === id ? {...item , isEdit: !item.isEdit} :item);
        }
    },
});


export default ManualSlice.reducer;
export const {AddTodo,AddTask,DeleteTodo,CancelEdit,ChangeEdit} = ManualSlice.actions;