import {useState} from 'react'
import {useReducer} from 'react'
import AddTask from './AddTask'
import TaskList from './TaskList'

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];

function tasksReducer(tasks,action){
   switch (action.type) {
    case 'added': {
        return [
            ...tasks,
            {
                id: action.id,
                text: action.text,
                done: false
            }
        ]
    }
    case 'changed': {
        return tasks.map((t: { id: number; }) => {
           if(t.id === action.task.id){
            return action.task
           }
           else{
            return t;
           }
        })
    }
    case 'deleted': {
        return tasks.filter((t: { id: number; }) => t.id !== action.id)
    }
   
    default: {
       throw Error('unknown actions: ' + action.type)
    }
        
   }
}

export default function TaskApp(){
//    const [tasks,setTasks] = useState(initialTasks)
   const [tasks,dispatch] = useReducer(tasksReducer,initialTasks)

   function handleAddTask(text: any){
    //   setTasks([
    //     ...tasks,
    //     {
    //       id: nextId++,
    //       text:text,
    //       done: false  
    //     }
    //   ])
    dispatch({
        type: 'added',
        id: nextId++,
        text: text,
        });
   }

   function handleChangeTask(task: {id: number, text: string, done: boolean}){
    // setTasks(
    //     tasks.map((t) => {
    //        if (t.id === task.id){
    //         return task
    //        } else {
    //         return t
    //        }
    //     })
    // )
    dispatch({
        type: 'changed',
        task: task,
    });
   }

   function handleDeleteTask(taskId: number) {
    //  setTasks(tasks.filter((t) => t.id !== taskId))
    dispatch({
        type: 'deleted',
        id: taskId,
    })
   }

   return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask}/>
      <TaskList 
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
   )
}