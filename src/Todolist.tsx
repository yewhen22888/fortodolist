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
    AddTask: () => void
}


export function Todolist(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button onClick={() => { props.AddTask }} />
            </div>
            <ul>
                {
                    props.tasks.map((t) => <li> <input type="checkbox" checked={t.isDone} />
                        <span>{t.item}</span>
                        <button onClick={() => { props.RemoveTasks(t.id) }}>x</button> </li>)

                }
            </ul>
            <div>
                <button onClick={() => (props.ChangeFilter("all"))}>all</button>
                <button onClick={() => (props.ChangeFilter("completed"))}>completed</button>
                <button onClick={() => (props.ChangeFilter("active"))}>active</button>
            </div>

        </div>
    )
}