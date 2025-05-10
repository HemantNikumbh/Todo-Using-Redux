import { createStore } from "redux"
import {composeWithDevTools} from '@redux-devtools/extension'  


const ADD_TASK = 'task/add'
const DELETE_TASK = 'task/delete'   
const initialState = {
    tasks: [],  
}

const taskReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TASK:            // Changed from 'ADD_TASK' to ADD_TASK
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case DELETE_TASK:         // Changed from 'DELETE_TASK' to DELETE_TASK
            const updatedTasks = state.tasks.filter((curtask, index) => {
                return index !== action.payload
            })
            return {
                ...state,
                tasks:updatedTasks
            }
        default:
            return state   
    }
}

// create store

export const store = createStore(taskReducer,composeWithDevTools())   

// Subscribe to store changes
// store.subscribe(() => {
//     console.log('Updated State:', store.getState())
// })

//create Action
export const addTask = (task) => {
    return {
        type: ADD_TASK,
        payload: task
    }   
}

export const deleteTask = (id) => {
    return {
        type: DELETE_TASK,
        payload: id
    }
}   



// Add task
store.dispatch(addTask("Hemant"))
console.log('Updated State:', store.getState())

store.dispatch(addTask("Sadhana"))
console.log('Updated State:', store.getState())

store.dispatch(addTask("Rajendra"))
console.log('Updated State:', store.getState())


store.dispatch(deleteTask(1))
console.log('Updated State:', store.getState())


