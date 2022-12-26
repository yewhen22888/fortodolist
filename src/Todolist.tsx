import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { FilterValueType } from './App'

export type TaskType = {
    id: string
    item: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    RemoveTasks: (id: string) => void
    ChangeFilter: (value: FilterValueType) => void
    AddTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    const [NewTaskTitle, setNewTaskTitle] = useState("");
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.AddTask(NewTaskTitle); setNewTaskTitle("")
        }
    }
    const onClickHandler = () => { props.AddTask(NewTaskTitle); setNewTaskTitle("") }
    const AllHendler = () => { props.ChangeFilter("all") }
    const CompletedHendler = () => { props.ChangeFilter("completed") }
    const ActiveHendler = () => { props.ChangeFilter("active") }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={NewTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler} />

                <button
                    onClick={onClickHandler}>
                    add
                </button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {

                        const RemoveHandler= () =>{props.RemoveTasks(t.id) }

                        return <li> <input type="checkbox" checked={t.isDone} />
                            <span>{t.item}</span>
                            <button onClick={RemoveHandler}>x</button> </li>
                    })

                }
            </ul>
            <div>
                <button onClick={AllHendler}>all</button>
                <button onClick={CompletedHendler}>completed</button>
                <button onClick={ActiveHendler}>active</button>
            </div>

        </div>
    )
}