import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/TodoReducer";

const init = () =>{
    return JSON.parse(localStorage.getItem('todos') || [] )
}

export const useTodo = (initialState={}) => {

    const [todos, dispatch] = useReducer( todoReducer, initialState , init );

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ) )
    }, [ todos ])
    
    const handleNewTodo = (todo) =>{
        const action ={
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        const action ={
            type: '[TODO] Remove Todo',
            payload: id
        }
        dispatch( action );
    }

    const handleToggleTodo = ( id ) => {
        const action ={
            type: '[TODO] Toggle Todo',
            payload: id
        }
        dispatch( action );
    }

    const todosCount = todos.length;

    const pendingTodosCount = todos.filter(todo=> !todo.done).length;

    return{
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount,
        pendingTodosCount
    }
}
