import { ChangeEvent, useState,KeyboardEvent } from "react"
import './App.css';
type ButtonFormType = {
    AddItem: (title: string) => void
   
}

function ButttonForm (props:ButtonFormType){
    const [NewTaskTitle, setNewTaskTitle] = useState("")
    const [Error, setError] = useState<string | null>(null)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onClickHandler()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const onClickHandler = () => {
        if (NewTaskTitle.trim() !== "") {
            props.AddItem(NewTaskTitle); setNewTaskTitle("");
        } else {
            setError("Field is not required");
        }
    }
    return(
       <div className="App">
        <input
        value={NewTaskTitle}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={Error ? "error" : ""} />   
<button
onClick={onClickHandler}>
+
</button>{Error && <div className="error-message">{Error}</div>}
</div>

    )}

    export default ButttonForm