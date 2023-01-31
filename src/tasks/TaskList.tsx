import {useState} from 'react'

export default function TaskList({tasks,onChangeTask,onDeleteTask}: { tasks: {id: number,text: string,done: boolean}[] , onChangeTask: React.Dispatch<React.SetStateAction<object>> , onDeleteTask: React.Dispatch<React.SetStateAction<number>> }){
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask}/>
                </li> 
            ))}
        </ul>
    )
}


function Task({task,onChange,onDelete}: { task: {id: number,text: string,done: boolean} , onChange: React.Dispatch<React.SetStateAction<object>> , onDelete: React.Dispatch<React.SetStateAction<number>> }){
    const [isEditing,setIsEditing] = useState(false)
    let taskContent;

    if(isEditing) {
        taskContent = (
            <>
              <input
                value={task.text}
                onChange={(e) => {
                    onChange({
                        ...task,
                        text: e.target.value
                    })
                }}
              />
              <button className='btn' onClick={() => setIsEditing(false)}>Save</button>
            </>
        )
    } else {
        taskContent = (
            <>
               {task.text}
               <button className='btn' onClick={() => setIsEditing(true)}>Edit</button>
            </>
        )
    }
    return (
        <label>
            <input 
              type="checkbox"
              checked={task.done}
              onChange={(e) => {
                onChange({
                    ...task,
                    done: e.target.checked
                })
              }}
            />
            {taskContent}
            <button className='btn' onClick={() => onDelete(task.id)}>Delete</button>
        </label>
    )
}