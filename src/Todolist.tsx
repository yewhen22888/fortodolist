import { useState, ChangeEvent, KeyboardEvent, ChangeEventHandler } from 'react'
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
    ChangeStatus: (taskId: string, isDone: boolean) => void
    Filter: FilterValueType
}

export function Todolist(props: PropsType) {

    const [NewTaskTitle, setNewTaskTitle] = useState("")

    const [Error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onClickHandler()
        }
    }
    const onClickHandler = () => {
        if (NewTaskTitle.trim() !== "") {
            props.AddTask(NewTaskTitle); setNewTaskTitle("");
        } else {
            setError("Field is not required");
        }

    }
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
                    onKeyPress={onKeyPressHandler}
                    className={Error ? "error" : ""} />

                <button
                    onClick={onClickHandler}>
                    add
                </button>
            </div>
            {Error && <div className="error-message">{Error}</div>}
            <ul>
                {
                    props.tasks.map((t) => {

                        const RemoveHandler = () => { props.RemoveTasks(t.id) }
                        const OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.ChangeStatus(t.id, e.currentTarget.checked)
                        }

                        return <li className={t.isDone ? 'isDone' : ""}>
                            <input
                                type="checkbox"
                                onChange={OnChangeHandler}
                                checked={t.isDone}
                            />
                            <span>{t.item}</span>
                            <button onClick={RemoveHandler}>x</button> </li>
                    })

                }
            </ul>
            <div>
                <button className={props.Filter === 'all' ? 'active' : ""} onClick={AllHendler}>all</button>
                <button className={props.Filter === 'completed' ? 'active' : ""} onClick={CompletedHendler}>completed</button>
                <button className={props.Filter === 'active' ? 'active' : ""} onClick={ActiveHendler}>active</button>
            </div>

        </div>
    )
}