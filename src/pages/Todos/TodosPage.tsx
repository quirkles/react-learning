import {useLoader} from "../../hooks";
import {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import {useTodos, type Todo} from "../../hooks";
import {v4} from "uuid";

export function TodosPage() {
    const [newTodo, setNewTodo] = useState<Todo>(initTodo())
    const {
        todos,
        addTodo,
        removeTodo,
        toggleTodoCompleted
    } = useTodos()
    const handleNewTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodo({
            ...newTodo,
            text: e.target.value
        })
    }
    const addNewTodo = (e: SyntheticEvent) => {
        addTodo(newTodo)
        setNewTodo(initTodo)
    }
    return (
        <>
            <div className="card">
                <div className="grid-container">
                    <div className="grid-x grid-padding-x">
                        <div className="small-12 cell">
                            <label>New Todo:
                                <input type="text" placeholder="" value={newTodo.text} onChange={handleNewTodoChange}/>
                            </label>
                        </div>
                        <div className="small-12 cell">
                            <button className="button" onClick={addNewTodo}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ul>
                    {todos.map(t => (
                        <li key={t.id}>
                            <div>
                                <button className="button" onClick={() => removeTodo(t.id)}>x</button>
                                <span>{t.text}</span>
                                <input type="checkbox"
                                       onChange={() => toggleTodoCompleted(t.id)}
                                       checked={t.completed}/><label>{t.completed ? "complete" : "incomplete"}</label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

function initTodo(): Todo {
    return {
        completed: false,
        text: "",
        id: v4()
    }
}
