
import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import ButttonForm from './ButtonForm';
import { TaskType, Todolist } from './Todolist'


export type FilterValueType = "all" | "completed" | "active";

type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

type TasksType = {
  [key: string]: Array<TaskType>
}

function App() {

  let TaskId1 = v1()
  let TaskId2 = v1()

  function AddTask(title: string, todolistId: string) {
    let tasksObj = tasks[todolistId]
    let NewTask = { id: v1(), item: title, isDone: false }
    let Newtasks = [NewTask, ...tasksObj];
    tasks[todolistId] = Newtasks
    setTasks({ ...tasks })
  }

  function RemoveTasks(id: string, todolistId: string) {
    let tasksObj = tasks[todolistId]
    let Filtertasks = tasksObj.filter(t => t.id !== id)
    tasks[todolistId] = Filtertasks
    setTasks({ ...tasks })
  }

  function ChangeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasksObj = tasks[todolistId]
    let task = tasksObj.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks({ ...tasks })
  }

  function ChangeFilter(value: FilterValueType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  let removeTodolist = (todolistId: string) => {
    let todolistObj = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(todolistObj)
  }

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: TaskId1, title: 'what do you play', filter: 'all' },
    { id: TaskId2, title: 'what do you Learn', filter: 'all' }

  ])

  let [tasks, setTasks] = useState<TasksType>({
    [TaskId1]: [{ id: v1(), item: 'guitar', isDone: true },
    { id: v1(), item: 'piano', isDone: false },
    { id: v1(), item: 'triangel', isDone: false },
    { id: v1(), item: 'violin', isDone: false }],

    [TaskId2]: [{ id: v1(), item: 'Reackt', isDone: true },
    { id: v1(), item: 'English', isDone: false },
    { id: v1(), item: 'Books', isDone: false }]
  })

  function AddItem(title: string) {
    let NewTask: TodolistType = { id: v1(), title: title, filter: 'all' }
    setTodolists([NewTask, ...todolists])
    setTasks({ ...tasks, [NewTask.id]: [] })
  }

  function ChangeItem(title: string, todolistId: string, id: string) {
    let taskObj = tasks[todolistId];
    let taskf = taskObj.find(t => t.id === id);
    if (taskf) {
      taskf.item = title  
    }

    setTasks({...tasks})
  }

  return (

    <div >
      <ButttonForm AddItem={AddItem} />

      <div className='AppItem'> {
        todolists.map((tl) => {
          let TaskForTodolist = tasks[tl.id];
          if (tl.filter === "completed") {
            TaskForTodolist = TaskForTodolist.filter(t => t.isDone === true);
          };
          if (tl.filter === "active") {
            TaskForTodolist = TaskForTodolist.filter(t => t.isDone === false)
          }
          return <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={TaskForTodolist}
            RemoveTasks={RemoveTasks}
            ChangeFilter={ChangeFilter}
            AddTask={AddTask}
            ChangeItem={ChangeItem}
            ChangeStatus={ChangeStatus}
            Filter={tl.filter}
            removeTodolist={removeTodolist} />
        })}</div>
    </div>
  )
}




export default App;
