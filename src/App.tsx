
import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist'
import { TaskType } from './Todolist'

export type FilterValueType = "all" | "completed" | "active";

function App() {

  let [data, setData] = useState<Array<TaskType>>([
    { id: 1, item: 'guitar', isDone: true },
    { id: 2, item: 'piano', isDone: false },
    { id: 3, item: 'triangel', isDone: false },
    { id: 4, item: 'violin', isDone: false }
  ])

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


  function RemoveTasks(id: number) {
    let Filtertasks = data.filter(t => t.id !== id)
    setData(Filtertasks)
  }


  return (
    <div className='App'>
      <Todolist title='what do you play' tasks={TaskForTodolist} RemoveTasks={RemoveTasks} ChangeFilter={ChangeFilter} />
      {/* <Todolist title='what movies you seen?' tasks={tasks2} />
      <Todolist title='what books you read?' tasks={tasks3}  /> */}

    </div>
  )
}




export default App;
