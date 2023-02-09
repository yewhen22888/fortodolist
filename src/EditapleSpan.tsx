import { ChangeEvent, useState } from "react"

type EditableSpanType = {
    item: string
    ChangeItem:(title:string) => void
}

function EditableSpan(props: EditableSpanType) {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const VievModeActivate = () =>{
        setEditMode(false);
        props.ChangeItem(title)
    }

    const EditModeActivate = () => {
        setEditMode(true);
        setTitle(props.item)
    }

    const ChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (editMode ?
        <input value={title} onChange={ChangeTitle} onBlur={VievModeActivate} autoFocus />
        : <span onDoubleClick={EditModeActivate}>{props.item}</span>

    )
}

export default EditableSpan