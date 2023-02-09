import { ChangeEvent, } from 'react'
import { FilterValueType } from './App'
import ButttonForm from './ButtonForm'
import EditableSpan from './EditapleSpan'


export type TaskType = {
    id: string
    item: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    RemoveTasks: (id: string, todolistId: string) => void
    ChangeFilter: (value: FilterValueType, todolistId: string) => void
    AddTask: (title: string, todolistId: string) => void
    ChangeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    ChangeItem:(title:string,todolistId:string,id:string) => void
    Filter: FilterValueType
    id: string

}

export function Todolist(props: PropsType) {

    const AllHendler = () => { props.ChangeFilter("all", props.id) }
    const CompletedHendler = () => { props.ChangeFilter("completed", props.id) }
    const ActiveHendler = () => { props.ChangeFilter("active", props.id) }
    const removeTodolist = () => { props.removeTodolist(props.id) }
    const AddItem = (title: string) => {
        props.AddTask(title, props.id)
    }
    return (
        <div className='todolist'>
            <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>

            <div>
                <ButttonForm AddItem={AddItem} />
            </div>

            <ul><div > 
                {
                    props.tasks.map((t) => {

                        const RemoveHandler = () => { props.RemoveTasks(t.id, props.id) }
                        const OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.ChangeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const ChangeItem = (title:string) =>{
                            props.ChangeItem(title,props.id,t.id)
                        }

                        return <li className={t.isDone ? 'isDone' : ""}>
                            <input
                                type="checkbox"
                                onChange={OnChangeHandler}
                                checked={t.isDone}
                            />
                            <EditableSpan item={t.item} ChangeItem={ChangeItem}/>
                            <button onClick={RemoveHandler}>x</button>
                        </li>
                       
                    })

                }
                </div></ul>
            <div>
                <button className={props.Filter === 'all' ? 'active' : ""} onClick={AllHendler}>all</button>
                <button className={props.Filter === 'completed' ? 'active' : ""} onClick={CompletedHendler}>completed</button>
                <button className={props.Filter === 'active' ? 'active' : ""} onClick={ActiveHendler}>active</button>
            </div>

        </div>
    )
}



