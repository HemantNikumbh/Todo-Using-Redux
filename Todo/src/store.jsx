import { createStore } from "redux"
import {composeWithDevTools} from '@redux-devtools/extension'  
import { thunk } from 'redux-thunk'   
import { applyMiddleware } from "redux" 


const ADD_TASK = 'task/add'
const DELETE_TASK = 'task/delete'
const FETCH_TASK = 'task/fetch'   
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
            case FETCH_TASK:
                return{
                    ...state,
                    tasks:[...state.tasks,...action.payload]  
                }
        default:
            return state   
    }
}

// create store

export const store = createStore(taskReducer,composeWithDevTools(applyMiddleware(thunk)))      

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

export const FetchTask = () => {
    return async (dispatch) => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
            const data = await res.json()
            dispatch({
                type: FETCH_TASK,
                payload: data.map((todo) => todo.title) // Changed 'tasks' to 'data'
            })
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
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


