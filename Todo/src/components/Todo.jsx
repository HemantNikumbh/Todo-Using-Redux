import React from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { useState } from 'react'    
import { MdDeleteForever } from 'react-icons/md'
import { addTask, deleteTask,FetchTask } from '../store.jsx'  // Importing action creators 


export const Todo = () => {
    const tasks =  useSelector((state)=>state.tasks)
    // console.log('state', state.tasks)
    const dispatch = useDispatch();   
    const[task, setTask] = useState('')   

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(addTask(task))
        return setTask('')
    }
    const handleTaskDelete = (index) => {
        return dispatch(deleteTask(index))
    }
    
    const handleFetchtask = () => {
        return dispatch(FetchTask())
    }


  return (
    <div className='container'>
        <div className="todo-app">
            <h1>
                <i className="fa-regular fa-pen-to-square"></i>To-Do Lists
            </h1>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <input type="text" className='form-control' id='input-box' 
                    placeholder='Add a new task'
                    value={task}
                    onChange={(e)=>setTask(e.target.value)} />
                    <button>Add Task</button>
                </form>
            </div>
                <button onClick={handleFetchtask}>Fetch Task</button>
            <ul id="list-container">
                {
                    tasks.map((curtask,index) =>{
                        return <li key={index}>
                            <p>{index}: {curtask}</p>
                            <MdDeleteForever className='icon-style' onClick={() => handleTaskDelete(index)} />
                        </li>
                    })
                
                }
            </ul>
        </div>

    </div>
  )
}
