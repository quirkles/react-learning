import {useEffect, useState} from "react";

export interface Todo {
    id: string;
    text: string;
    completed: boolean
}

const todosKey = 'TODOS'

export function useTodos(): {
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    removeTodo: (id: string) => void;
    toggleTodoCompleted: (id: string) => void;
} {
    const [todos, setTodos] = useState<Todo[]>(readTodos())

    useEffect(() => {
        saveTodos(todos)
    }, [todos])

    const addTodo = (todo: Todo) => {
        setTodos([...todos, todo])
    };
    const removeTodo = (id: string) => {
        setTodos(todos.filter(t => t.id !== id))
    };
    const toggleTodoCompleted = (id: string) => {
        setTodos(todos.map(t =>
            t.id !== id ? t : {...t, completed: !t.completed}
        ))
    };

    return {
        todos,
        addTodo,
        removeTodo,
        toggleTodoCompleted
    }
}

function saveTodos(todos: Todo[]) {
    localStorage.setItem(todosKey, JSON.stringify(todos));
}

function readTodos(): Todo[] {
    const todosString = localStorage.getItem(todosKey) || "[]"
    return JSON.parse(todosString)
}
