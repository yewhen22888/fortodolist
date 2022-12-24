
import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist'
import { TaskType } from './Todolist'

export type FilterValueType = "all" | "completed" | "active";

function App() {

  let [data, setData] = useState<Array<TaskType>>([
    { id: v1(), item: 'guitar', isDone: true },
    { id: v1(), item: 'piano', isDone: false },
    { id: v1(), item: 'triangel', isDone: false },
    { id: v1(), item: 'violin', isDone: false }
  ])

  function AddTask() {
    let NewTask = { id: v1(), item: 'new Task', isDone: false }
    let Newtasks = [NewTask, ...data];
    setData(Newtasks)
  }


  let [Filter, setFilter] = useState<FilterValueType>("all")

  function ChangeFilter(value: FilterValueType) {
    setFilter(value);
  }

  let TaskForTodolist = data;
  if (Filter === "completed") {
    TaskForTodolist = data.filter(t => t.isDone === true);
  };
  if (Filter === "active") {
    TaskForTodolist = data.filter(t => t.isDone === false)
  }



  function RemoveTasks(id: string) {
    let Filtertasks = data.filter(t => t.id !== id)
    setData(Filtertasks)
  }




  return (
    <div className='App'>
      <Todolist 
      title='what do you play' 
      tasks={TaskForTodolist} 
      RemoveTasks={RemoveTasks}
       ChangeFilter={ChangeFilter}
       AddTask={AddTask}/>
      {/* <Todolist title='what movies you seen?' tasks={tasks2} />
      <Todolist title='what books you read?' tasks={tasks3}  /> */}

    </div>
  )
}




export default App;
